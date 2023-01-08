import { Pane } from 'tweakpane';

export default class Debug {

    panel: Pane

    constructor() {
        this.panel = new Pane()

    }

    addNewInput = (param, inputType: string, input: string, min?: number, max?: number, step?: number) => {

        if (inputType === "range") {

            this.range(param, input, min, max)


        } else if (inputType === "step") {

            this.stepper(param, input, step, min, max)
        }
    }

    range = (param: any, input: string, min: number, max: number) => {
        this.panel.addInput(param, input, {
            min: min,
            max: max,
        });


    }

    stepper = (param, input: string, step: number, min: number, max: number) => {
        this.panel.addInput(param, input, {
            step: step,
            min: min,
            max: max,
        });
    }

    addEventsChange = (param, item, input, specialType) => {
        this.panel.addInput(param, input).on('change', (e) => {

            if (specialType === "uniforms") {
                item[input].value = param
            }

        });
    }
}
