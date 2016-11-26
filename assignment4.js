(function() {

  $('.flexsearch-input').keyup(function(event){
    var text = $(".flexsearch-input").val();
    $(".suggestions").html("");
    getJSON(text);
  });

  $(document).on('click', '.flexsearch-submit', function(){
    var text = $(".flexsearch-input").val();
    if(text.length > 0) {
      var url = "http://www.google.com/search?q=" + text;
      window.open(url);
    }
  });

  function getJSON(search) {
    $.ajax({
      url:"http://www.mattbowytz.com/simple_api.json?data=all",
      type:"GET",
      dataType:"json"
    })

    .done(function(json){
      json.data.programming.forEach(function(searchText) {
        searchText = searchText.toLowerCase();
        if(search.length > 0 && searchText.startsWith(search.toLowerCase())){
          $(".suggestions").append("<a target=\"_blank\" href=\"http://www.google.com/search?q=" + searchText + "\">" + searchText + "</a>");
        }
      });
      json.data.interests.forEach(function(searchText) {
        searchText = searchText.toLowerCase();
        if(search.length > 0 && searchText.startsWith(search.toLowerCase())){
          $(".suggestions").append("<a target=\"_blank\" href=\"http://www.google.com/search?q=" + searchText + "\">" + searchText + "</a>");
        }
      });
    })
    
    .fail(function(){
      console.log("ERROR!");
    });
  }
})();
