(function() {
    var container = document.getElementById("vuplay-container");
    // Set your mpeg-DASH URL here.
    var dashStreamURL = "<your-stream-url>";
    // Set your HLS URL here.
    var hlsStreamURL = "<your-stream-url>";
    // Please login to https://admin.drm.technology to generate a vudrm token.
    var vudrmToken = "<your-vudrm-token>";

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
        dash: dashStreamURL,
        hls: hlsStreamURL,
        poster: "vuplay_poster.png",
    };

    // MPEG-dash with PlayReady example
    // source.drm = {
    //     playready: {
    //         LA_URL: "https://playready-license.drm.technology/rightsmanager.asmx?token=" + encodeURIComponent(vudrmToken);
    //     }
    // }

    // MPEG-dash with Widevine example
    // source.drm = {
    //     widevine: {
    //         LA_URL: "https://widevine-proxy.drm.technology/proxy",
    //         prepareMessage: function (keyMessage) {
    //             return JSON.stringify({
    //                 token: vudrmToken,
    //                 drm_info: Array.apply(null, new Uint8Array(keyMessage.message)),
    //                 kid: "<content-key-id>"
    //             });
    //         }
    //     }
    // }

    // HLS with Fairplay
    // source.drm = {
    //     fairplay: {
    //         certificateURL: "<your-fairplay-cert>",
    //         LA_URL: "<fairplay-license-server-url>",
    //         certificateHeaders: {
    //             "x-vudrm-token": [vudrmToken],
    //         },
    //         headers: {
    //             "Content-Type": "application/json",
    //         },
    //         prepareMessage: function (keyMessageEvent, keySession) {
    //             return JSON.stringify({
    //                 token: vudrmToken,
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
