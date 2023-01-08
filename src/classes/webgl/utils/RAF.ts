type Callback = {
  name: string;
  callback: Function;
};

class RAF {
  callbacks: Callback[] = [];

  constructor() {
    // this.play();
    this.mainLoop()
  }

  subscribe = (name: string, callback: Function) => {

    this.callbacks.push({
      name,
      callback,
    });

  
  };

  unsubscribe = (name: string) => {
    this.callbacks.forEach((item, i) => {
      if (item.name == name) this.callbacks.splice(i, i + 1);
    });
  };

  mainLoop() {
    
    requestAnimationFrame((t)=> {
      
      // todo: normalize at 60fps

      this.callbacks.forEach(item => {
        item.callback(t);
      });

      this.mainLoop()
    })  
  }

  frame(past?, now = null, t?: number) {
    now = now || performance.now();
    const last = past || now;
    const d = (now - last) * (60 / 1000); // normalize at 60fps

    this.callbacks.forEach(item => {
      item.callback(d);
    });

    //requestAnimationFrame(item.callback)

    // requestAnimationFrame(this.frame)
    requestAnimationFrame((t) => this.frame(this, now, t));
  }

  play() {
    requestAnimationFrame((t) => this.frame(t));
  }
}
export default RAF;
