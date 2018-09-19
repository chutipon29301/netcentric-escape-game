export class Timer{
    public static startCountdown(seconds:number){
        var counter = seconds;
        var interval = setInterval(() => {
          console.log(counter);
          counter--;
          if(counter < 0 ){
            clearInterval(interval);
            console.log('Ding!');
          };
        }, 1000);
      };

}