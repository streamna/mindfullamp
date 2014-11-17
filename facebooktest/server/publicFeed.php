<?php
/**
 * Created by IntelliJ IDEA.
 * User: stream
 * Date: 11/16/14
 * Time: 4:09 PM
 */

session_start();
require_once( 'Facebook/FacebookSession.php' );
require_once( 'Facebook/FacebookRedirectLoginHelper.php' );
require_once( 'Facebook/FacebookRequest.php' );
require_once( 'Facebook/FacebookResponse.php' );
require_once( 'Facebook/FacebookSDKException.php' );
require_once( 'Facebook/FacebookRequestException.php' );
require_once( 'Facebook/FacebookAuthorizationException.php' );
require_once( 'Facebook/GraphObject.php' );
require_once( 'Facebook/GraphUser.php' );

use Facebook\FacebookSession;
use Facebook\FacebookRedirectLoginHelper;
use Facebook\FacebookRequest;
use Facebook\FacebookResponse;
use Facebook\FacebookSDKException;
use Facebook\FacebookRequestException;
use Facebook\FacebookAuthorizationException;
use Facebook\GraphObject;
use Facebook\GraphUser;

// Initialize application by Application ID and Secret
FacebookSession::setDefaultApplication('1457172401177965','30e55c87aba6e6e7e8aaed380e37f170');

try {
    $access_token = $_GET['access_token'];
    $session = new FacebookSession( $access_token );
    echo $access_token;
}
catch( FacebookRequestException $ex ) {
    // Exception
}
catch( Exception $ex ) {
    // When validation fails or other local issues
}


if($session) {

    try {

        $user_profile = (new FacebookRequest(
            $session, 'GET', '/me'
        ))->execute()->getGraphObject(GraphUser::className());

        $response[$res_count] = array(
            "user_profile" => $user_profile,
        );

        echo json_encode($response);

    } catch(FacebookRequestException $e) {
        echo "Exception occured, code: " . $e->getCode();
        echo " with message: " . $e->getMessage();

    }

}




?>