$(function () {
  'use strict'

  $('h3, .list-group h5, h5 span, strong, small, h6, .btn-like, .badge, th, td').doomEdit({
    submitOnBlur: true, 
    ajaxSubmit:false,
    showOnEvent: 'dblclick',
    submitBtn: false,
    cancelBtn: false,
    afterFormSubmit: function (data, form, el) {el.text(data);}
  });
  
  $('p').doomEdit({
    submitOnBlur: true, 
    ajaxSubmit:false, 
    showOnEvent: 'dblclick',
    submitBtn: false, 
    cancelBtn: false, 
    afterFormSubmit: function (data, form, el) {el.text(data);},
    editField: '<textarea name="myEditTextarea" rows="5" cols="60"></textarea>'
  });
  // $('p').doomEdit({
  //   ajaxSubmit:false, 
  //   afterFormSubmit: function (data, form, el) {el.text(data),
  // });

  // $('h5, strong, small, h6, .btn-like, .badge, th, td').doomEdit({
  //   //submitOnBlur: true,
  //   ajaxSubmit:false, afterFormSubmit: function (data, form, el) {el.text(data)
  //   // editField: '<input name="myEditInput" />'
  // });

  var generalSortableOps = {
    animation: 200,
    handle: '.sortable-handle', // handle's class
    ghostClass: 'ghost'
  }
  $('.sortable-main').sortable(generalSortableOps);
  $('.sortable-sub').sortable(generalSortableOps);
  $('#info-1').sortable(generalSortableOps);
  $('#info-2').sortable(generalSortableOps);

  $('[data-toggle="offcanvas"]').on('click', function () {
    $('.offcanvas-collapse').toggleClass('open')
  })

  $(document).on('click','.feather-plus, .feather-minus', function(event){
    $(this).toggleClass('feather-minus');
    $(this).toggleClass('feather-plus');
    var plusorminus = $(this).attr('class').split('feather-').pop().split(' ')[0];
    $(this).attr('data-feather',plusorminus);
    feather.replace()
  });

  $(document).on('click', '#moreless', function() {
      var svg = $(this).find(".feather-chevrons-down, .feather-chevrons-up");
      svg.toggleClass("feather-chevrons-down");
      svg.toggleClass("feather-chevrons-up");
      var upordown = svg.attr('class').split('chevrons-').pop().split(' ')[0];
      svg.attr('data-feather','chevrons-'+upordown);
      if(upordown=='up'){
        $(this).find('span').text('less');
        $("svg[data-toggle='collapse']").filter('.feather-plus').trigger('click');
      }
      else {
        $(this).find('span').text('more');
        $("svg[data-toggle='collapse']").filter('.feather-minus').trigger('click');
      }
      feather.replace()
  });

  $(document).on('click', '#print', function() {
    $('main').removeClass('container');
    $('main').addClass('px-3');
    $('.bookmark').addClass('d-none');
    $('.edit-bar').remove();
    window.print();
  });

  $(document).on('change', '.edit-bar input', function() {
    var newval = parseInt($(this).val());
    $(this).parents('.stack').data('ord',newval);
  });
  $(document).on('click', '.edit-bar .delete', function() {
    $(this).parents('.stack, .list-group-item, .btn-like').first().remove();
  });

  $.fn.sortChildren = function (sortingFunction) {
      return this.each(function () {
          const children = $(this).children().get();
          children.sort(sortingFunction);
          $(this).append(children);
      });
  };

  $(document).keydown(function(e) {
    if ((e.key == 'z' || e.key == 'Z' ) && (e.ctrlKey || e.metaKey))
    {
      $('main').addClass('container');
      $('main').removeClass('px-3');
      $('.bookmark').removeClass('d-none');
      e.preventDefault();
      return false;
    }
    else if ((e.key == 'e' || e.key == 'E' ) && (e.ctrlKey || e.metaKey))
    {
      if($('.edit-bar').length == 0){
        $('.stack').each(function(index){
          $(this).data('ord',index);
          $(this).prepend(
            `<div class="edit-bar">
              <!--<input type="number" value="${index}">-->
              <i data-feather="move" class="mbtn sortable-handle text-green-50"></i>
              <i data-feather="x-square" class="mbtn delete text-red"></i>
            </div>`
          );
        });
        $('.list-group-item').prepend(
          `<div class="edit-bar">
             <i data-feather="move" class="mbtn icon-size-14 sortable-handle text-green-50"></i>
            <i data-feather="x-circle" class="mbtn icon-size-14 delete text-red-50"></i>
          </div>`
        );
        $('.btn-like').prepend(
          `<div class="edit-bar-sm">
            <i data-feather="move" class="mbtn icon-size-14 sortable-handle text-green-50"></i>
            <i data-feather="x-circle" class="mbtn icon-size-14 delete text-red-50"></i>
          </div>`
        );
        feather.replace();
      }
      else {
        $('.edit-bar').remove();
        $('.edit-bar-sm').remove();
        //$(".stacked-columns").sortChildren((a, b) => $(a).data('ord') >  $(b).data('ord')  ? 1 : -1);
      }
      e.preventDefault();
      return false;
    }
    return true;
  }); 
})
