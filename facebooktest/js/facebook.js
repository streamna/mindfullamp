 // This is called with the results from from FB.getLoginStatus().
  function statusChangeCallback(response) {
    console.log('statusChangeCallback');
    console.log(response);
    console.log(response['authResponse']['accessToken']);

    // The response object is returned with a status field that lets the
    // app know the current login status of the person.
    // Full docs on the response object can be found in the documentation
    // for FB.getLoginStatus().
    if (response.status === 'connected') {
      // Logged into your app and Facebook.
      //or response.authResponse.accessToken
      var AccessToken=response['authResponse']['accessToken'];
      var uid = response.authResponse.userID;
      var accessToken = response.authResponse.accessToken;
      publicFeed( accessToken );

    } else if (response.status === 'not_authorized') {
      // The person is logged into Facebook, but not your app.
      document.getElementById('status').innerHTML = 'Please log ' +
        'into this app.';
    } else {
      // The person is not logged into Facebook, so we're not sure if
      // they are logged into this app or not.
      document.getElementById('status').innerHTML = 'Please log ' +
        'into Facebook.';
    }
  }//statusChangeCallback

  // This function is called when someone finishes with the Login Button.
  // See the onlogin handler attached to it in the sample code below.
  function checkLoginState() {
    FB.getLoginStatus(function(response) {
        console.log("getLoginStatus" + response);
      statusChangeCallback(response);
    });
  }

    window.fbAsyncInit = function() {
  FB.init({
    appId      : '770707736335720',
    cookie     : true,  // enable cookies to allow the server to access 
                        // the session
    xfbml      : true,  // parse social plugins on this page
    version    : 'v2.2' // use version 2.1
  }); //init

  // Now that we've initialized the JavaScript SDK, we call 
  // FB.getLoginStatus().  This function gets the state of the
  // person visiting this page and can return one of three states to
  // the callback you provide.  They can be:
  // 1. Logged into your app ('connected')
  // 2. Logged into Facebook, but not your app ('not_authorized')
  // 3. Not logged into Facebook and can't tell if they are logged into
  //    your app or not.
  // These three cases are handled in the callback function.

  FB.getLoginStatus(function(response) {
    statusChangeCallback(response);   });
  };

  // Load the SDK asynchronously
  (function(d, s, id) {
    var js, fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) return;
    js = d.createElement(s); js.id = id;
    js.src = "//connect.facebook.net/en_US/sdk.js";
    fjs.parentNode.insertBefore(js, fjs);
  }(document, 'script', 'facebook-jssdk'));


  function publicFeed( accessToken ) {
      $.get("server/publicfeed.php", function (data) {
              var obj = JSON.parse(data);
              var user_profile = obj['user_profile'];    //set title
              console.log("profile");
              console.log(user_profile);
      }
      );//get


    console.log('Welcome!  Fetching your information.... ');          
    FB.api('/me/feed',
      null,
      function(response) {
      console.log('Successful login for: ' + response);
          var jsonD =  {data:JSON.stringify(response)};
          console.log("jsonD:", response);

      document.getElementById('status').innerHTML =                   
        'Thanks for logging in, ' + response+ '!';
        //findUserFriends();


      });

      var body = 'Reading JS SDK documentation';
      FB.api('/me/feed', 'post', { message: body }, function(response) {
          if (!response || response.error) {
              alert('Error occured');
          } else {
              alert('Post ID: ' + response.id);
          }
      });
	};                                                               
                                                                     

  function postJSON(url, data, callback){                             
        var request = new XMLHttpRequest();                           
        request.open("POST", url);                                    
        request.onreadystatechange = function(){                      
                if( request.readystate === 4 && callback){            
                        callback(request);                            
                }                                                     
        }                                                             
        request.setRequestHeader("Content-Type", "application/json"); 
        request.send(JSON.stringify(data));
  }




 
