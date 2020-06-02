
    // Create a Checkout Session with the selected quantity
window.onload = function () {
  init();
  var createCheckoutSession = function () {
    return fetch('/create-checkout-session', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
      }),
    }).then(function (result) {
      return result.json();
    });
  };

      // Setup event handler to create a Checkout Session on submit
      var stripe = Stripe('pk_test_NezeOJysg4glHpGCKu4sF37V00GuPYtbUj');
      document.querySelector('#submit').addEventListener('click', function (evt) {
      createCheckoutSession().then(function (data) {
        stripe
          .redirectToCheckout({
            sessionId: data.sessionId,
          })
          .then(handleResult);
      });
    });

}
