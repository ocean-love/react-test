/** @jsx React.DOM */ 
var React = require('react/addons');
var ReactTransitionGroup  = React.addons.TransitionGroup;
var $ = require('jquery-browserify');

var MenuItem = React.createClass({
     getInitialState: function(){
        return { 
            focused: false
        };
  },
    // Called when component is added to an exisiting TransitionGroup
    componentWillEnter: function(callback) {
        var $el = $(this.getDOMNode());
        $el
            .stop(true)
            .css({opacity:1})
            .animate({"opacity": "0"}, 1000, callback);
    },
    // Callback for WillEnter
    componentDidEnter: function() {
        var $el = $(this.getDOMNode());
        $el
            .stop(true)
            .animate({"opacity": "1"}, 1000);
    },
    // Handles clicks for the individual MenuItems
    clickHandler: function(){
        /// The click handler will update the state with
        /// the index of the focused menu entry       
 
        //Animate selected item using jQuery
        var $el =  $(this.getDOMNode());
        $el
          .stop()
          /// Animate left margin to push selected item...
          .animate({"marginLeft": "500px"}, 1000, function(){  
              /// ...and animate to remove margin when done.
              $(this).animate({"marginLeft":"0px"}, 1000);
          });

        /// Pass event to parent
        this.props.onClick(this);

    },
    render: function() {
        return <span className={this.props.className} onClick={this.clickHandler}>{this.props.children}</span>;
    }
});


var Menu = React.createClass({
  // Init component
  getInitialState: function(){
        return { 
            // Start of with the first item focused
            focused: 0,
            // Starting menu items
            menuItems: ['hello', 'world', 'click', 'me']
        };
  },
  clickHandler: function(index){
      /// Update state using React
      /// Add new menu item
      var newMenuItems = this.state.menuItems.concat(["added"]);

      /// Change clicked item title
      newMenuItems[index] = "clicked";

      /// Update state with new focus index and new list of menu items!
      this.setState({
          focused: index, 
          menuItems: newMenuItems
      });
  },
  /**
   * @return {object}
   */
  render: function() {
    var self = this;
    return (
      <div id="menu">
        <ReactTransitionGroup  transitionName="example">
          
        { self.state.menuItems.map(function(m, index){
            var style = '';
            if(self.state.focused == index){
                console.log("style = focused");
                style = 'focused';
            }
            var refName = "menuItem_"+index;

            // Render as manu MenuItem components as we have in the map
            // The key value is accessible as props.children in the MenuItem component, same as className
            return <MenuItem
                onClick={self.clickHandler.bind(null,index)}
                key={"menu_item"+index}
                className={style}
                >
                {m}
            </MenuItem>;
        }) }
        
        </ReactTransitionGroup >
      </div>
      
    );  

  }

});

module.exports = Menu;
