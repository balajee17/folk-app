Node version = "v22.14.0"
Java version = "17.0.14"

NOTE : "Do this whenever you reinstall nodemodules"

File path = nodemodules -> rn-fetch-blog -> android -> src -> main -> java -> com -> RFFetchBlob -> RFFetchBlobReq.java

Replace this line = "appCtx.registerReceiver(this, new IntentFilter(DownloadManager.ACTION_DOWNLOAD_COMPLETE));"

With this: "if (Build.VERSION.SDK_INT >= 34 && appCtx.getApplicationInfo().targetSdkVersion >= 34) {
                  appCtx.registerReceiver(this, new IntentFilter(DownloadManager.ACTION_DOWNLOAD_COMPLETE), Context.RECEIVER_EXPORTED);
            }else{
                  appCtx.registerReceiver(this, new IntentFilter(DownloadManager.ACTION_DOWNLOAD_COMPLETE));
            }"


                