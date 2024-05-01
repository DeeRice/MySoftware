using Android.App;
using Android.Content;
using Android.Content.PM;
using Android.InputMethodServices;
using Android.Media;
using Android.OS;
using Android.Util;
using Android.Views;
using Android.Views.InputMethods;
using Android.Widget;
using AndroidX.Core.Content;
using AndroidX.Core.View.InputMethod;
using Android.InputMethodServices;
using Java.Awt.Font;
using Java.IO;
using Java.Lang;
using Java.Lang.Reflect;
using Java.Nio.FileNio.Attributes;
using System;
using static Android.Util.EventLogTags;
using static Android.InputMethodServices.KeyboardView;
using Android.Runtime;
using Android.Text;
namespace Yahoo.Keyboard
{
    [Service(Exported = false, Name = "Yahoo.Keyboard.Yahoo.Keyboard.YahooKeyboardIMEService")]
    public class YahooKeyboardIMEService : InputMethodService, IOnKeyboardActionListener
    {
        private static string TAG = "YahooKeyboardIMEService";
        private static string AUTHORITY = "com.creptecsinc.yahoo.keyboard.inputcontent";
        private static string MIME_TYPE_GIF = "image/gif";
        private bool pngSupported;
        private string[] rawFiles;
        private KeyboardView keyboardView;
        private Android.InputMethodServices.Keyboard keyboard;
        private bool IsCommitContentSupported(EditorInfo? editorInfo, string mimeType)
        {

            if (editorInfo == null)
            {
                return false;
            }

            IInputConnection ic = CurrentInputConnection;
            if (ic == null)
            {
                return false;
            }

            if (!ValidatePackageName(editorInfo))
            {
                return false;
            }

            string[] supportedMimeTypes = EditorInfoCompat.GetContentMimeTypes(editorInfo);

            System.Console.Write(editorInfo);
            foreach (string supportedMimeType in supportedMimeTypes)
            {

                if (ClipDescription.CompareMimeTypes(mimeType, supportedMimeType))
                {
                    return true;
                }
            }
            return false;
        }

        private void DoCommitContent(string description, string mimeType, Java.IO.File file)
        {

            EditorInfo editorInfo = CurrentInputEditorInfo;

            Android.Net.Uri contentUri = FileProvider.GetUriForFile(this, AUTHORITY, file);

            int flag;
            if (Build.VERSION.SdkInt >= BuildVersionCodes.R)
            {
                // On API 25 and later devices, as an analogy of Intent.FLAG_GRANT_READ_URI_PERMISSION,
                // you can specify InputConnectionCompat.INPUT_CONTENT_GRANT_READ_URI_PERMISSION to give
                // a temporary read access to the recipient application without exporting your content
                // provider.
                flag = InputConnectionCompat.InputContentGrantReadUriPermission;
            }
            else
            {
                // On API 24 and prior devices, we cannot rely on
                // InputConnectionCompat.INPUT_CONTENT_GRANT_READ_URI_PERMISSION. You as an IME author
                // need to decide what access control is needed (or not needed) for content URIs that
                // you are going to expose. This sample uses Context.grantUriPermission(), but you can
                // implement your own mechanism that satisfies your own requirements.
                flag = 0;
                try
                {
                    GrantUriPermission(
                        editorInfo.PackageName, contentUri, ActivityFlags.GrantReadUriPermission);
                }
                catch (System.Exception e)
                {
                    Log.Error(TAG, "grantUriPermission failed packageName=" + editorInfo.PackageName
                        + " contentUri=" + contentUri, e);
                }
            }

            InputContentInfoCompat inputContentInfoCompat = new InputContentInfoCompat(
            contentUri,
                new ClipDescription(description, new string[] { mimeType }),
                null);
            InputConnectionCompat.CommitContent(
                CurrentInputConnection, CurrentInputEditorInfo, inputContentInfoCompat,
                flag, null);
        }

        private bool ValidatePackageName(EditorInfo? editorInfo)
        {
            if (editorInfo == null)
            {
                return false;
            }

            string packageName = editorInfo.PackageName;
            if (packageName == null)
            {
                return false;
            }

            if (Build.VERSION.SdkInt >= BuildVersionCodes.R)
            {
                return true;
            }

            InputBinding inputBinding = CurrentInputBinding;
            if (inputBinding == null)
            {
                // Due to b.android.com/225029, it is possible that getCurrentInputBinding() returns
                // null even after onStartInputView() is called.
                // TODO: Come up with a way to work around this bug....
                Log.Error(TAG, "inputBinding should not be null here. "
                    + "You are likely to be hitting b.android.com/225029");
                return false;
            }
            int packageUid = inputBinding.Uid;

            if (Build.VERSION.SdkInt >= BuildVersionCodes.S)
            {
                AppOpsManager appOpsManager =
                    (AppOpsManager)GetSystemService(Context.AppOpsService);
                try
                {
                    appOpsManager.CheckPackage(packageUid, packageName);
                }
                catch (System.Exception e)
                {
                    return false;
                }
                return true;
            }
            PackageManager packageManager = PackageManager;
            string[] possiblePackageNames = packageManager.GetPackagesForUid(packageUid);
            foreach (string possiblePackageName in possiblePackageNames)
            {
                if (packageName.Equals(possiblePackageName))
                {
                    return true;
                }
            }
            return false;
        }

        private string[] GetAllRawResources()
        {
            Field[] fields = Resources.Class.GetDeclaredFields(); 
            string[] names = new string[fields.Length];
            try
            {
                for (int i = 0; i < fields.Length; i++)
                {
                    Field f = fields[i];
                    names[i] = f.Name;
                }
            }
            catch (System.Exception e)
            {
                System.Console.WriteLine(e.StackTrace);
            }

            return names;
        }


        public override void OnCreate()
        {
            base.OnCreate();
            rawFiles = GetAllRawResources();
        }

        public override View OnCreateInputView()
        {
            keyboardView = (KeyboardView)LayoutInflater.Inflate(Android.Resource.Id.KeyboardView, null);
            keyboard = new Android.InputMethodServices.Keyboard(this, Resource.Xml.yahooKeyboard);
            keyboardView.Keyboard = keyboard;
            keyboardView.OnKeyboardActionListener = this;
            return keyboardView;
        }

        public override bool OnEvaluateFullscreenMode()
        {
            // In full-screen mode the inserted content is likely to be hidden by the IME. Hence in this
            // sample we simply disable full-screen mode.
            // return false;
            return true;
        }


        public override void OnStartInputView(EditorInfo info, bool restarting)
        {
            pngSupported = IsCommitContentSupported(info, MIME_TYPE_GIF);

            if (!pngSupported)
            {
                Toast.MakeText(ApplicationContext,
                    "Images not supported here. Please change to another keyboard.",
                    ToastLength.Short).Show();
            }
        }

        private static Java.IO.File GetFileForResource(Context context, int res, Java.IO.File outputDir, string filename)
        {
            Java.IO.File outputFile = new Java.IO.File(outputDir, filename);
            byte[] buffer = new byte[4096];
            System.IO.Stream resourceReader = null;
            try
            {
                try
                {
                    resourceReader = context.Resources.OpenRawResource(res);
                    OutputStream dataWriter = null;
                    try
                    {
                        dataWriter = new FileOutputStream(outputFile);
                        while (true)
                        {
                            int numRead = resourceReader.Read(buffer);
                            if (numRead <= 0)
                            {
                                break;
                            }
                            dataWriter.Write(buffer, 0, numRead);
                        }
                        return outputFile;
                    }
                    finally
                    {
                        if (dataWriter != null)
                        {
                            dataWriter.Flush();
                            dataWriter.Close();
                        }
                    }
                }
                finally
                {
                    if (resourceReader != null)
                    {
                        resourceReader.Close();
                    }
                }
            }
            catch (System.IO.IOException ex)
            {
                return null;
            }
        }

        public void OnKey([GeneratedEnum] Android.Views.Keycode primaryCode, [GeneratedEnum] Android.Views.Keycode[]? keyCodes)
        {
            IInputConnection inputConnection = CurrentInputConnection;
            if (inputConnection != null)
            {
                switch (primaryCode)
                {
                    case Android.Views.Keycode.Del:
                        string selectedText = inputConnection.GetSelectedText(0);

                        if (TextUtils.IsEmpty(selectedText))
                        {
                            inputConnection.DeleteSurroundingText(1, 0);
                        }
                        else
                        {
                            inputConnection.CommitText("", 1);
                        }
                        break;
                    case Android.Views.Keycode.Enter:
                        inputConnection.SendKeyEvent(new KeyEvent(KeyEventActions.Down, Android.Views.Keycode.Enter));
                        break;

                    default:
                        ProcessInput(primaryCode, keyCodes);
                        break;
                }
            }
        }

        public void ProcessInput([GeneratedEnum] Android.Views.Keycode primaryCode, [GeneratedEnum] Android.Views.Keycode[]? keyCodes)
        {
                        string imageName = "";
                        Java.IO.File imagesDir = new Java.IO.File(FilesDir, "images");
                        Java.IO.File file = GetFileForResource(this, Resources.GetIdentifier("angel", "raw", PackageName), imagesDir, $"angel.gif");
                        DoCommitContent("angel.gif", MIME_TYPE_GIF, file);
        }

        public void OnPress([GeneratedEnum] Android.Views.Keycode primaryCode)
        {
          
        }

        public void OnRelease([GeneratedEnum] Android.Views.Keycode primaryCode)
        {
            
        }

        public void OnText(ICharSequence? text)
        {
          
        }

        public void SwipeDown()
        {
         
        }

        public void SwipeLeft()
        {
          
        }

        public void SwipeRight()
        {
      
        }

        public void SwipeUp()
        {
         
        }
    }
}


