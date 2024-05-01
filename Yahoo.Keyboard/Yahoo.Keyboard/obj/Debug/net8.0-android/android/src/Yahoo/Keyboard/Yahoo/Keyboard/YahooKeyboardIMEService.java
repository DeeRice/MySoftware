package Yahoo.Keyboard.Yahoo.Keyboard;


public class YahooKeyboardIMEService
	extends android.inputmethodservice.InputMethodService
	implements
		mono.android.IGCUserPeer,
		android.inputmethodservice.KeyboardView.OnKeyboardActionListener
{
/** @hide */
	public static final String __md_methods;
	static {
		__md_methods = 
			"n_onCreate:()V:GetOnCreateHandler\n" +
			"n_onCreateInputView:()Landroid/view/View;:GetOnCreateInputViewHandler\n" +
			"n_onEvaluateFullscreenMode:()Z:GetOnEvaluateFullscreenModeHandler\n" +
			"n_onStartInputView:(Landroid/view/inputmethod/EditorInfo;Z)V:GetOnStartInputView_Landroid_view_inputmethod_EditorInfo_ZHandler\n" +
			"n_onKey:(I[I)V:GetOnKey_IarrayIHandler:Android.InputMethodServices.KeyboardView/IOnKeyboardActionListenerInvoker, Mono.Android, Version=0.0.0.0, Culture=neutral, PublicKeyToken=null\n" +
			"n_onPress:(I)V:GetOnPress_IHandler:Android.InputMethodServices.KeyboardView/IOnKeyboardActionListenerInvoker, Mono.Android, Version=0.0.0.0, Culture=neutral, PublicKeyToken=null\n" +
			"n_onRelease:(I)V:GetOnRelease_IHandler:Android.InputMethodServices.KeyboardView/IOnKeyboardActionListenerInvoker, Mono.Android, Version=0.0.0.0, Culture=neutral, PublicKeyToken=null\n" +
			"n_onText:(Ljava/lang/CharSequence;)V:GetOnText_Ljava_lang_CharSequence_Handler:Android.InputMethodServices.KeyboardView/IOnKeyboardActionListenerInvoker, Mono.Android, Version=0.0.0.0, Culture=neutral, PublicKeyToken=null\n" +
			"n_swipeDown:()V:GetSwipeDownHandler:Android.InputMethodServices.KeyboardView/IOnKeyboardActionListenerInvoker, Mono.Android, Version=0.0.0.0, Culture=neutral, PublicKeyToken=null\n" +
			"n_swipeLeft:()V:GetSwipeLeftHandler:Android.InputMethodServices.KeyboardView/IOnKeyboardActionListenerInvoker, Mono.Android, Version=0.0.0.0, Culture=neutral, PublicKeyToken=null\n" +
			"n_swipeRight:()V:GetSwipeRightHandler:Android.InputMethodServices.KeyboardView/IOnKeyboardActionListenerInvoker, Mono.Android, Version=0.0.0.0, Culture=neutral, PublicKeyToken=null\n" +
			"n_swipeUp:()V:GetSwipeUpHandler:Android.InputMethodServices.KeyboardView/IOnKeyboardActionListenerInvoker, Mono.Android, Version=0.0.0.0, Culture=neutral, PublicKeyToken=null\n" +
			"";
		mono.android.Runtime.register ("Yahoo.Keyboard.YahooKeyboardIMEService, Yahoo.Keyboard", YahooKeyboardIMEService.class, __md_methods);
	}


	public YahooKeyboardIMEService ()
	{
		super ();
		if (getClass () == YahooKeyboardIMEService.class) {
			mono.android.TypeManager.Activate ("Yahoo.Keyboard.YahooKeyboardIMEService, Yahoo.Keyboard", "", this, new java.lang.Object[] {  });
		}
	}


	public void onCreate ()
	{
		n_onCreate ();
	}

	private native void n_onCreate ();


	public android.view.View onCreateInputView ()
	{
		return n_onCreateInputView ();
	}

	private native android.view.View n_onCreateInputView ();


	public boolean onEvaluateFullscreenMode ()
	{
		return n_onEvaluateFullscreenMode ();
	}

	private native boolean n_onEvaluateFullscreenMode ();


	public void onStartInputView (android.view.inputmethod.EditorInfo p0, boolean p1)
	{
		n_onStartInputView (p0, p1);
	}

	private native void n_onStartInputView (android.view.inputmethod.EditorInfo p0, boolean p1);


	public void onKey (int p0, int[] p1)
	{
		n_onKey (p0, p1);
	}

	private native void n_onKey (int p0, int[] p1);


	public void onPress (int p0)
	{
		n_onPress (p0);
	}

	private native void n_onPress (int p0);


	public void onRelease (int p0)
	{
		n_onRelease (p0);
	}

	private native void n_onRelease (int p0);


	public void onText (java.lang.CharSequence p0)
	{
		n_onText (p0);
	}

	private native void n_onText (java.lang.CharSequence p0);


	public void swipeDown ()
	{
		n_swipeDown ();
	}

	private native void n_swipeDown ();


	public void swipeLeft ()
	{
		n_swipeLeft ();
	}

	private native void n_swipeLeft ();


	public void swipeRight ()
	{
		n_swipeRight ();
	}

	private native void n_swipeRight ();


	public void swipeUp ()
	{
		n_swipeUp ();
	}

	private native void n_swipeUp ();

	private java.util.ArrayList refList;
	public void monodroidAddReference (java.lang.Object obj)
	{
		if (refList == null)
			refList = new java.util.ArrayList ();
		refList.add (obj);
	}

	public void monodroidClearReferences ()
	{
		if (refList != null)
			refList.clear ();
	}
}
