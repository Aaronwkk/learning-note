// function f(arr, left, right){

//   const a = arr[right]
//   let i = left - 1

//   for(j = left; j<right; j++){

//     if(arr[j] < a){
//       i++
//       [arr[i], arr[j]] = [arr[j], arr[i]]
//     }

//   }
//   [arr[i+1], arr[right]] = [arr[right], arr[i+1]]
//   return i+1
// }

// function quickSort (list, left = 0, right = list.length - 1){
//   if(left<right){
//     const i = f(list, left, right)
//     quickSort(list, left, i-1)
//     quickSort(list, i+1, right)
//   }
//     return list
// }

// const a = [7,3,1,6,9,3,6]
// quickSort(a)
// console.log(a)


function bubbleSort(list){

  for(let i = 0; i< list.length - 1; i++){
    for(let j = 0; j< list.length - 1 - i; j++){

      if(list[j] > list[j+1]){
        [list[j], list[j+1]] = [list[j+1], list[j]]
      }

    }
  }
  return list
}

bubbleSort([7,3,1,6,9,3,6])