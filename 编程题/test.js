class MaxRequest{
  
  constructor(){
    this.num = 0
  }

  addTask(task){
    
  }

}

function request(url) {
  return new Promise((r) => {
    const time = Math.random() * 1000;
    setTimeout(() => r(url), time);
  });
}