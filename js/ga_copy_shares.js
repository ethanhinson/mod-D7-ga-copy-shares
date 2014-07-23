(function($) {
    Drupal.behaviors.ga_copy_shares = {
        attach: function(context, settings) {
            $(document).ready(function() {
                var s = window.location.hash,
                    k = '.|' + btoa('cpsh') + '|.',
                    a = 'Copy/Paste Referral',
                    l = document.getElementsByTagName("title")[0].innerHTML,
                    c = 'Copy/Paste Hit';
                if(s.indexOf(k) < 0) {
                    window.location.hash += k;
                } else if(!Drupal.ga_copy_shares.storageGet()) {
                    if(typeof _gaq != 'undefined') {
                        Drupal.ga_copy_shares.gajs(context, settings, a, l, c);
                    } else if(typeof ga != 'undefined') {
                        Drupal.ga_copy_shares.analyticsjs(context, settings, a, l, c);
                    }
                }
            });
        }
    };

    /**
     * Helpers for managing GA integrations
     */
    Drupal.ga_copy_shares = {};

    Drupal.ga_copy_shares.analyticsjs = function(context, settings, a, l ,c) {
        ga('send', {
            'hitType': 'event',
            'eventCategory': a,
            'eventAction': c,
            'eventLabel': l
        });
        Drupal.ga_copy_shares.storageSet();
    };

    Drupal.ga_copy_shares.gajs = function(context, settings, a, l ,c) {
        _gaq.push(['_trackEvent', a, c, l, opt_noninteraction = true ]);
        Drupal.ga_copy_shares.storageSet();
    };

    /**
     * Wrapper around storage management
     */
    Drupal.ga_copy_shares.storageSet = function() {
        return sessionStorage.setItem('cpsh_tracked', 1);
    };

    Drupal.ga_copy_shares.storageGet = function() {
        return sessionStorage.getItem('cpsh_tracked');
    };

    Drupal.ga_copy_shares.storageDelete = function() {
        return sessionStorage.removeItem('cpsh_tracked');
    };

})(jQuery);