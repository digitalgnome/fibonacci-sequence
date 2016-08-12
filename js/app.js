/******************************************************************
*               Fibonacci Sequence Calculator                     *
* Calculates the next 10 numbers in the Fibonacci sequence given  *
* user input of a starting Fibonacci term number.  The forumula   *
* used to calculate the next Fibonacci number is:                 *
* Xn = Xn-1 + Xn-2                                                *
* Code writtten by Tariq Khan and the git code and pages repo can *
* be found at:                                                    *
* https://github.com/digitalgnome/fibonacci-sequence              *
******************************************************************/

$(function() {
  var startNum = 0;

  // set focus to user number input text box
  $('#inputNum').focus();

  // Fibonacci sequence generator to find the previous Fibonacci term
  // number for user input #
  function fibSeqStart ( num ) {
    var fibArr = [0, 1]
        fibNum = 0;

    for (var i = 0; i < num - 1; i++) {
      fibNum = fibArr[i] + fibArr[i+1];
      fibArr.push(fibNum);
    }
    // return only the last two numbers of the array
    fibArr = fibArr.slice(-2);
    return fibSeqEnd(fibArr);
  }

  // calculate next ten numbers in the sequence
  function fibSeqEnd ( finalFibArr ) {
    for (var i = 0; i < 9; i++) {
      fibNum = finalFibArr[i] + finalFibArr[i+1];
      finalFibArr.push(fibNum);
    }
    if (startNum === 0) {
      finalFibArr.pop();
      return tableData(finalFibArr);
    } else {
      finalFibArr.shift();
      return tableData(finalFibArr);
    }
  }

  // output the results to a table
  function tableData ( fibArr ) {
    var formattedArr = [];
    for (var i = 0; i < fibArr.length; i++) {
      if (fibArr[i].toString().length > 9) {
        formattedArr.push(fibArr[i].toExponential(2));
      } else {
        formattedArr.push(fibArr[i]);
      }
    }

    // final data array to be animated
    for (var i = 0; i < formattedArr.length; i++) {
      var id = '#td' + i;
      $(id).html(formattedArr[i]);
    }

    // animated table data
    var count = 0;
    $('td').each(function() {
      $(this).css({'backgroundColor': '#0582C2', 'color': '#FFF'});
      $('#td' + count).fadeTo(300, 1, 'swing', function() {
        count++;
        $('#td' + count).fadeTo(300, 1, 'swing');
      });
    });
    // return focus to user number input field
    $('#inputNum').focus();
  }

  // this is the submit button control logic
  $('#fibNum').click(function(event) {
    // stop active animation if button is clicked
    $('td').clearQueue().stop(true);

    var regex = /^[0]$|^[1-9][0-9]*$/;  // regular expression to limit input to an integer
    startNum = $('#inputNum').val();

    // stop default button event and clear table data
    event.preventDefault();
    $('td').css({opacity: 0});

    // clear input text
    $('#inputNum').val('');

    // test that input value is a number with a regular expression
    if (regex.test(startNum) === false) {
      // clear text input field and table data
      $('#inputNum').attr('placeholder', 'Please enter an integer value');
      $('td').html('');
      // return focus to user number input field
      $('#inputNum').focus();
    // set upper limit of the value that will be used to generate the sequence
    } else if (startNum > 1477) {
        $('#inputNum').attr('placeholder', 'A lower value please');
    } else {
      $('#inputNum').attr('placeholder', 'Sequence Starting term # Xn = ' + startNum);
      startNum = parseInt(startNum);
      fibSeqStart(startNum);
    }
  });

  // create modal functionality for Fibonacci sequence explanation
  // variable to toggle modal visible/not visible
  var toggle = true;
  $('#fibExplanation').click(function(event) {

    event.preventDefault();

    // clear text input field and table data
    $('td').css({'backgroundColor': '#ECEFF0'});
    $('#inputNum').attr('placeholder', 'Enter a starting Fibonacci term #');
    $('td').html('');

    // Toggle Modal
    if (toggle === true) {
      $('#fibModal').clearQueue().stop(true).animate({'top': '10%'}, 2000);
      $('#fibExplanation').attr('value', 'Click to Hide Explanation');
      // put focus #fibExplanation button to use enter key to close modal as an option
      $('#fibExplanation').focus();
      toggle = false;
    } else if (toggle === false) {
      $('#fibModal').clearQueue().stop(true).animate({'top': '-90%', 'transform': 'translateY(90%)'}, 2000);
      $('#fibExplanation').attr('value', 'Fibonacci Explanation');
      // return focus to user number input field
      $('#inputNum').focus();
      toggle = true;
    }


  });
});






