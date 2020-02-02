class MenuText {

    static getTitleStyle() {
      return {
        "fill": "white",
        "font": "bold 70pt Comic Sans MS",
        "strokeThickness": 8
      }
    };

    static getMenuItemStyle() {
      return {
        "fill": "white",
        "font": "bold 30pt Comic Sans MS",
        "strokeThickness": 8
      }
    };

    static getMenuItemHoverStyle() {
      return {
        "fill": "maroon",
        "font": "bold 30pt Comic Sans MS",
        "strokeThickness": 8
      }
    }

    static getMenuItemSelectStyle() {
      return {
        "fill": "black",
        "font": "bold 30pt Comic Sans MS",
        "strokeThickness": 8
      }
    }


}

module.exports = MenuText;
