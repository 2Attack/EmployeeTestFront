require("cleave.js/dist/addons/cleave-phone.ru");
import Cleave from "cleave.js";

export const InputMaskPhone = {
  bind(el) {
    const input = el.querySelector("input");
    input._vCleave = new Cleave(input, {
      phone: true,
      phoneRegionCode: "ru"
    });
  },
  unbind(el) {
    const input = el.querySelector("input");
    input._vCleave.destroy();
  }
};
