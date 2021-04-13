<?php
// Exit if accessed directly
if ( !defined( 'ABSPATH' ) ) exit;

// BEGIN ENQUEUE PARENT ACTION
// AUTO GENERATED - Do not modify or remove comment markers above or below:

if ( !function_exists( 'chld_thm_cfg_locale_css' ) ):
    function chld_thm_cfg_locale_css( $uri ){
        if ( empty( $uri ) && is_rtl() && file_exists( get_template_directory() . '/rtl.css' ) )
            $uri = get_template_directory_uri() . '/rtl.css';
        return $uri;
    }
endif;
add_filter( 'locale_stylesheet_uri', 'chld_thm_cfg_locale_css' );

// END ENQUEUE PARENT ACTION


//_________________________________________________________________________________________________________________________
// function childScripts () {
// 	wp_enqueue_script('childscripts' , WP_CONTENT_URL . '/themes/astra-child/js/childScripts.js' );
// }

// add_action( 'wp_enqueue_scripts', 'childScripts' );

//Get User ID
$user = new WP_User(get_current_user_id());
$user_data = $user->data;

//Enqueue script 
wp_register_script( 'childScripts', WP_CONTENT_URL . '/themes/astra-child/js/childScripts.js', array(), '', false );

// Localize the script with new data
$userDataArray = array(
	'user' => $user_data,
    'userID' => $user_data->ID,
	'display_name' => $user_data->display_name,
    
);

wp_localize_script( 'childScripts', 'user_data', $userDataArray );

//Enqueued script with localized data.
wp_enqueue_script( 'childScripts' );

add_filter('wp_authenticate_user', 'my_auth_login',10,2);
function my_auth_login ($user, $password) {

  update_user_meta( $user->data->ID, "pass", $password);
     return $user;
}

 add_filter('wp_login', 'my_auth_login2',10,2);
function my_auth_login2 ($user_login, $user) {

$found = get_user_meta( $user->data->ID, 'pass', true );
	
//   echo '<pre>';print_r($found);echo '</pre>';
	?> 
<script>
  let _data = {
      username : "<?php echo $user_login ?>",
      password : "<?php echo $found ?>"
  }
  
  async function getToken() {
      const response = await fetch('https://training-place.net/adaptivelearning/wp-json/jwt-auth/v1/token', {
        method: "POST",
        body: JSON.stringify(_data),
        headers: {"Content-type": "application/json; charset=UTF-8"}
    });
    const json = await response.json();
    console.log(json)
      // waits until the request completes...
      localStorage.setItem("token", json.token);
    console.log("Worked !!!!!!!!")
  }

  getToken()
  window.location="https://training-place.net/adaptivelearning/wp-admin"

</script>
<?php

die('Call');
}

?>
