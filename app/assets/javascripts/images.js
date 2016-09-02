$(document).ready(function() {
  $('.cloudinary-fileupload').cloudinary_fileupload();

  $('.cloudinary-fileupload').bind('cloudinarydone', onCloudinaryDone);

  $('.cloudinary-fileupload').bind('fileuploadsend', onFileUploadSend);
});

function onFileUploadSend(e, data) {
  console.log('file upload started');
}

function onCloudinaryDone(e, data) {
  console.log('file upload done');
  var image_id = 'image/upload/' + data.result.path + '#' + data.result.signature;

  $.ajax({
    url: '/images',
    method: 'POST',
    data: {
      image_id: image_id
    },
    dataType: 'JSON',
    success: uploadSuccessHandler,
    error: uploadErrorHandler
  });

  function uploadSuccessHandler(response) {
    if (response.message) {
      $('#message').text(response.message);
    }

    if (response.image) {
      var imgSrc = location.protocol + '//res.cloudinary.com/drplfnsyw/image/upload/' + response.image.image_id;
      $('#image').html($('<img />').attr('src', imgSrc));
    }
  }

  function uploadErrorHandler(response) {
    console.log('ERROR: ', response);
  }
}