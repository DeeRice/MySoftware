using Android.Content;

namespace Yahoo.Keyboard
{
    [Activity(Label = "@string/app_name", MainLauncher = true)]
    public class MainActivity : Activity
    {
        protected override void OnCreate(Bundle? savedInstanceState)
        {
            base.OnCreate(savedInstanceState);

            // Set our view from the "main" layout resource
            YahooKeyboardIMEService service = new YahooKeyboardIMEService();
            Intent intent = new Intent(this, typeof(YahooKeyboardIMEService));
            service.StartService(intent);
            SetContentView(Resource.Layout.activity_main);
        }
    }
}