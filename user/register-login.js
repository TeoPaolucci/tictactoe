'use strict';

//Antony's ttt api
var tttapi = {
  gameWatcher: null,
  ttt: 'http://ttt.wdibos.com',

  ajax: function(config, cb) {
    $.ajax(config).done(function(data, textStatus, jqxhr) {
      cb(null, data);
    }).fail(function(jqxhr, status, error) {
      cb({jqxher: jqxhr, status: status, error: error});
    });
  },

  register: function register(credentials, callback) {
    this.ajax({
      method: 'POST',
      // url: 'http://httpbin.org/post',
      url: this.ttt + '/users',
      contentType: 'application/json; charset=utf-8',
      data: JSON.stringify(credentials),
      dataType: 'json'
    }, callback);
  },

  login: function login(credentials, callback) {
    this.ajax({
      method: 'POST',
      // url: 'http://httpbin.org/post',
      url: this.ttt + '/login',
      contentType: 'application/json; charset=utf-8',
      data: JSON.stringify(credentials),
      dataType: 'json'
    }, callback);
  },

  //Authenticated api actions
  listGames: function (token, callback) {
    this.ajax({
      method: 'GET',
      url: this.ttt + '/games',
      headers: {
        Authorization: 'Token token=' + token
      },
      dataType: 'json'
      }, callback);
  },

  createGame: function (token, callback) {
    this.ajax({
      method: 'POST',
      url: this.ttt + '/games',
      headers: {
        Authorization: 'Token token=' + token
      },
      contentType: 'application/json; charset=utf-8',
      data: JSON.stringify({}),
      dataType: 'json',
    }, callback);
  },

  showGame: function (id, token, callback) {
    this.ajax({
      method: 'GET',
      url: this.ttt + '/games/' + id,
      headers: {
        Authorization: 'Token token=' + token
      },
      dataType: 'json'
    }, callback);
  },

  joinGame: function (id, token, callback) {
    this.ajax({
      method: 'PATCH',
      url: this.ttt + '/games/' + id,
      headers: {
        Authorization: 'Token token=' + token
      },
      contentType: 'application/json; charset=utf-8',
      data: JSON.stringify({}),
      dataType: 'json'
    }, callback);
  },

  markCell: function (id, data, token, callback) {
    this.ajax({
      method: 'PATCH',
      url: this.ttt + '/games/' + id,
      headers: {
        Authorization: 'Token token=' + token
      },
      contentType: 'application/json; charset=utf-8',
      data: JSON.stringify(data),
      dataType: 'json'
    }, callback);
  },

  watchGame: function (id, token) {
    var url = this.ttt + '/games/' + id + '/watch';
    var auth = {
      Authorization: 'Token token=' + token
    };
    this.gameWatcher = resourceWatcher(url, auth); //jshint ignore: line
    return this.gameWatcher;
  }
};


$(document).ready(function(){
  //close popup button click handler function
  var closeHandler = function closeHandler(){
    $('#close').on('click', function(){
      $('.popup').remove();
    });
  }

  //api wrappers courtesy of Antony.
  var form2object = function(form) {
    var data = {};
    $(form).children().each(function(index, element) {
      var type = $(this).attr('type');
      if ($(this).attr('name') && type !== 'submit' && type !== 'hidden') {
        data[$(this).attr('name')] = $(this).val();
      }
    });
    return data;
  };
  var wrap = function wrap(root, formData) {
    var wrapper = {};
    wrapper[root] = formData;
    return wrapper;
  };

  //popup for results window for results of ajax event
  var resultPopup = function resultPopup() {
    $('.userbar').append(
      '<div class="popup">' +
        '<textarea id="result"></textarea>' +
        '<input id="close" type="button" value="X" style="background-color: red; float:right;">' +
      '</div>'
    );
  };

  //Calback edited to create popup square with callback result as opposed to preformatted text box
  var callback = function callback(error, data) {
    resultPopup();
    closeHandler();
    if (error) {
      console.error(error);
      $('#result').val('status: ' + error.status + ', error: ' +error.error);
      return;
    }
    $('#result').val(JSON.stringify(data, null, 4));
  };

  //register button & form
  $('#reg-display').on('click', function(){
    $('.userbar').append(
      '<div class="popup">' +
        '<form id="register">' +
          '<input name="email" type="text" placeholder="E-mail"><br>' +
          '<input name="password" type="password" placeholder="Password"><br>' +
          '<input name="password_confirmation" type="password" placeholder="Confirm Password"><br>' +
          '<input name="register" type="submit" value="Register">' +
        '</form>' +
        '<input id="close" type="button" value="X" style="background-color: red; float:right;">' +
      '</div>'
    );
    closeHandler();
    $('#register').on('submit', function(e) {
      var credentials = wrap('credentials', form2object(this));
      $('.popup').remove();
      tttapi.register(credentials, callback);
      e.preventDefault();
    });
  });

  //login button & form
  $('#log-display').on('click', function(){
    $('.userbar').append(
      '<div class="popup">' +
        '<form id="login">' +
          '<input name="email" type="text" placeholder="E-mail"><br>' +
          '<input name="password" type="password" placeholder="Password"><br>' +
          '<input name="login" type="submit" value="Login">' +
        '</form>' +
        '<input id="close" type="button" value="X" style="background-color: red; float:right;">' +
      '</div>'
    );
    closeHandler();
    $('#login').on('submit', function(e) {
      var credentials = wrap('credentials', form2object(this));
      var cb = function cb(error, data) {
        if (error) {
          callback(error);
          return;
        }
        callback(null, data);
        $('.token').val(data.user.token);
      };
      $('.popup').remove();
      e.preventDefault();
      tttapi.login(credentials, cb);
    });
  });
});
