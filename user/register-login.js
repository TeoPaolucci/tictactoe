$(document).ready(function(){
  //register button
  $('#reg-display').on('click', function(){
    $('.userbar').append(
      '<div class="popup">' +
        '<input name="email" type="text" placeholder="E-mail"><br>' +
        '<input name="password" type="password" placeholder="Password"><br>' +
        '<input name="password_confirmation" type="password" placeholder="Confirm Password"><br>' +
        '<input name="register" type="submit" value="Register">' +
      '</div>'
    );
  });

  //login button
  $('#log-display').on('click', function(){
    $('.userbar').append(
      '<div class="popup">' +
        '<input name="email" type="text" placeholder="E-mail"><br>' +
        '<input name="password" type="password" placeholder="Password"><br>' +
        '<input name="login" type="submit" value="Login">' +
      '</div>'
    )
  });
});
