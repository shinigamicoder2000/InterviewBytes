function myFunction() {
    // Declare variables
    var input, filter, ul, li, a, i, txtValue;
    input = document.getElementById('inp');
    filter = input.value.toUpperCase();
    ul = document.getElementById("myUL");
    li = ul.getElementsByClassName('card');
    console.log(li);
  
    // Loop through all list items, and hide those who don't match the search query
    for (i = 0; i < li.length; i++) {
      cardBody= li[i].getElementsByClassName("card-body")[0];
      p=cardBody.getElementsByClassName("company")[0];
      a=p;
      txtValue = a.textContent || a.innerText;
      console.log(txtValue);
      if (txtValue.toUpperCase().indexOf(filter) > -1) {
        li[i].style.display = "";
      } else {
        li[i].style.display = "none";
      }
    }
  }