(function() {
    var container = document.getElementById("my-player");
    var VUDRM_TOKEN = "<your-vudrm-token>";

    var playerConfig = {
        key: "<your-bitmovin-player-key>",
        logs: {
            level: bitmovin.player.LogLevel.DEBUG,
        },
    };
    var source = {
        title: "Getting Started with the Bitmovin Player",
        description:
            "Now you are ready to embed the Bitmovin Player into your own website :)",
        dash: "<your-stream-url>",
        hls: "<your-stream-url>",
        poster:
            "https://bitmovin-a.akamaihd.net/content/MI201109210084_1/poster.jpg",
    };

    // MPEG-dash with PlayReady example

    // source.drm = {
    //     playready: {
    //         LA_URL: "https://playready-license.drm.technology/rightsmanager.asmx?token=" + encodeURIComponent(VUDRM_TOKEN);
    //     }
    // }

    // MPEG-dash with Widevine example

    // source.drm = {
    //     widevine: {
    //         LA_URL: "https://widevine-proxy.drm.technology/proxy",
    //         prepareMessage: function (keyMessage) {
    //             return JSON.stringify({
    //                 token: VUDRM_TOKEN,
    //                 drm_info: Array.apply(null, new Uint8Array(keyMessage.message)),
    //                 kid: "<CONTENT-KEY-ID>"
    //             });
    //         }
    //     }
    // }

    // HLS with Fairplay

    // source.drm = {
    //     fairplay: {
    //         certificateURL: "<YOUR-FAIRPLAY-CERT>",
    //         LA_URL: "<FAIRPLAY-LICENSE-SERVER-URL>",
    //         certificateHeaders: {
    //             "x-vudrm-token": [VUDRM_TOKEN],
    //         },
    //         headers: {
    //             "Content-Type": "application/json",
    //         },
    //         prepareMessage: function (keyMessageEvent, keySession) {
    //             return JSON.stringify({
    //                 token: VUDRM_TOKEN,
    //                 contentId: keySession.contentId,
    //                 payload: keyMessageEvent.messageBase64Encoded
    //             });
    //         },
    //         prepareContentId: function (rawContentId) {
    //             var tmp = rawContentId.split("/");
    //             return tmp[tmp.length - 1];
    //         },
    //         prepareCertificate: function (cert) {
    //             return new Uint8Array(cert);
    //         },
    //         prepareLicense: function (license) {
    //             return new Uint8Array(license);
    //         },
    //         licenseResponseType: "arraybuffer"
    //     }
    // }

    var player = new bitmovin.player.Player(container, playerConfig);
    player.load(source).then(
        function(player) {
            console.log("Successfully created Bitmovin Player instance");
        },
        function(reason) {
            console.log(reason);
        },
    );
})();
