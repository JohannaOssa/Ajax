$(document).ready(function(){
  $('.form-status').hide()
  $('button[type="submit"]').prop('disabled', true);
});

function validate () {
  var username, password
  username = $('#username').val()
  password = $('#password').val()
  if ((username === undefined || username === '')
                  || (password === undefined || password === '')) {
    $('.form-status').show()
    $('.form-status').css('color', '#db1325')
  } else {
    $('.form-status').hide()
    $('button[type="submit"]').prop('disabled', false)
  };
};

function loadPosts(){
  var postsUrl = 'http://jsonplaceholder.typicode.com/posts'
  $.ajax({
    url: postsUrl,
    method: 'GET'
  }).success(function(data) {
    console.log(data)
    setTableData(data)
  }).error(function(msg){
    alert(msg.responseText)
  })
};

function setTableData(posts) {
  var tbody = ''
  $.each(posts, function(i, post){
    tbody += '<tr><td>' + posts[i].userId + '</td><td>' + posts[i].title + '</td><td>' + posts[i].body + '</td></tr>'
  })
  $('#posts tbody').append(tbody)
};

function savePost() {
  var frm = $("#post-form")
  var formattedData = frm.serializeArray()
  var data = {}
  data.title = formattedData[0].value
  data.body = formattedData[1].value
  $.post( "http://jsonplaceholder.typicode.com/posts", data)
  .done(function(data) {
    console.log(data)
    alert("Nuevo Post creado: ")
  })
  .error(function(data) {
    console.log(data)
    alert("Error al crear post")
  })
};
