// 为了找出字符串中第一个不重复的字母，并使空间复杂度为 O(1)

function solution(s){
  let arr = new Array(26).fill(0)
    for(let i = 0; i<s.length; i++){
        let k = s[i].toLowerCase().charCodeAt(0)-97
        arr[k]++
    }
      for(let i = 0; i<s.length; i++){
        let k = s[i].toLowerCase().charCodeAt(0)-97
          if(arr[k] === 1) return s[i]
    }
  }
  
  // solution('strss')
  solution('SSttrss')
  // solution('steess')