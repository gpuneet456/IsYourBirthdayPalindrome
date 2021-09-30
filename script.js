function reverseString(str) {
  var listOfCharacters = str.split('');
  var reversedListOfChar = listOfCharacters.reverse();
  var reversedString = reversedListOfChar.join('');
  return reversedString;
}

function isStringPalindrome(str) {
  var reversedString = reverseString(str);
  if(str === reversedString){
    return true;
  }
  else{
    return false;
  }
}

function getDateAsString(date) {
  var dateInString = { day: '', month: '', year: '' };

  if (date.day < 10) {
    dateInString.day = '0' + date.day;
  }
  else {
    dateInString.day = date.day.toString();
  }

  if (date.month < 10) {
    dateInString.month = '0' + date.month;
  }
  else {
    dateInString.month = date.month.toString();
  }

  dateInString.year = date.year.toString();
  return dateInString;
}

function getDateInAllFormats(date) {
  var ddmmyyyy = date.day + date.month + date.year;
  var mmddyyyy = date.month + date.day + date.year;
  var yyyymmdd = date.year + date.month + date.day;
  var ddmmyy = date.day + date.month + date.year.slice(-2);
  var mmddyy = date.month + date.day + date.year.slice(-2);
  var yyddmm = date.year.slice(-2) + date.day + date.month;

  return [ddmmyyyy, mmddyyyy, yyyymmdd, ddmmyy, mmddyy, yyddmm];
}

function checkPalindromeForAllDateFormats(date) {
  var listofPalindromes = getDateInAllFormats(date);
  var flag=false;

  for (var i = 0; i < listofPalindromes.length; i++) {
    if(isStringPalindrome(listofPalindromes[i])){
      flag=true;
      break;
    }
  }
  return flag;
}

function isLeapYear(year) {

  if (year % 400 === 0)
    return true;

  if (year % 100 === 0)
    return false;

  if (year % 4 === 0)
    return true;

  return false;
}

function getNextDate(date) {
  var day = date.day + 1;
  var month = date.month;
  var year = date.year;

  var daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

  if (month === 2) {
    if (isLeapYear(year)) {
      if (day > 29) {
        day = 1;
        month = 3;
      }
    }
    else {
      if (day > 28) {
        day = 1;
        month = 3;
      }
    }
  }
  else {
    if (day > daysInMonth[month - 1]) {
      day = 1;
      month++;
    }
  }

  if (month > 12) {
    month = 1;
    year++;
  }

  return {
    day: day,
    month: month,
    year: year
  }
}

function getNextPalindromeDate(date) {

  var nextDate = getNextDate(date);
  var counter = 0;

  while (1) {
    counter++;
    var dateStr = getDateAsString(nextDate);
    var result = checkPalindromeForAllDateFormats(dateStr);

    
      if (result) {
        break;
      
    }
    nextDate = getNextDate(nextDate);
  }
  return [counter,nextDate];
}

function getPreviousDate(date) {
  var day = date.day - 1;
  var month = date.month;
  var year = date.year;

  var daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

  if (day === 0) {
    month--;

    if (month === 0) {
      month = 12;
      day = 31;
      year--;
    }
    else if (month === 2) {
      if (isLeapYear(year)) {
        day = 29;
      }
      else {
        day = 28;
      }
    }
    else {
      day = daysInMonth[month - 1];
    }
  }

  return {
    day: day,
    month: month,
    year: year
  }
}

function getPreviousPalindromeDate(date) {

  var previousDate = getPreviousDate(date);
  var counter = 0;

  while (1) {
    counter++;
    var dateStr = getDateAsString(previousDate);
    var result = checkPalindromeForAllDateFormats(dateStr);


      if (result) {
        break;
      }
      previousDate = getPreviousDate(previousDate);
    }
    return [counter,previousDate];
    
  }


var bdayInput = document.querySelector('#bday-input');
var showBtn = document.querySelector('#show-btn');
var outputDiv = document.querySelector('#output');

function clickHandler(e) {
  var bdayString = bdayInput.value;

  if (bdayString !== '') {
    var date = bdayString.split('-');
    var yyyy = date[0];
    var mm = date[1];
    var dd = date[2];

    var date = {
      day: Number(dd),
      month: Number(mm),
      year: Number(yyyy)
    };

    var dateStr = getDateAsString(date);
    var list = checkPalindromeForAllDateFormats(dateStr);
    var isPalindrome = false;

    for (let i = 0; i < list.length; i++) {
      if (list[i]) {
        isPalindrome = true;
        break;
      }
    }

    if (!isPalindrome) {
      const [counter1, nextDate] = getNextPalindromeDate(date);
      const [counter2, prevDate] = getPreviousPalindromeDate(date);

      if (counter1 > counter2) {
        outputDiv.innerText = `The nearest palindrome date is ${prevDate.day}-${prevDate.month}-${prevDate.year}, you missed by ${counter2} days.`;
      } else {
        outputDiv.innerText = `The nearest palindrome date is ${nextDate.day}-${nextDate.month}-${nextDate.year}, you missed by ${counter1} days.`;
      }

    } else {
      outputDiv.innerText = 'Yay! Your birthday is palindrome!';
    }
  }
}

showBtn.addEventListener('click', clickHandler);
