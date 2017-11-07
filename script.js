$(document).ready(function(){
  $('form').submit(function(){
    if($('input').val() !== ''){
      let newInput = $('input').val();
      let list = $('<li>' + newInput + '</li>');
      list.on('click', function(){
        $(this).remove()
      })
      $('ul').prepend(list);
      $('input').val('');
      return false;
    }

  })
})
