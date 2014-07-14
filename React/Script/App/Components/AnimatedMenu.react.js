/** @jsx React.DOM */ 
var React = require('react/addons');

//var ReactTransitionGroup  = React.addons.CSSTransitionGroup;
var ReactTransitionGroup  = React.addons.TransitionGroup;


var $ = require('jquery-browserify');

var MenuItem = React.createClass({
    componentWillEnter: function(callback) {
        var $el = $(this.getDOMNode());
        $el
            .stop(true)
            .css({opacity:1})
            .animate({"opacity": "0"}, 1000, callback);
    },
    componentDidEnter: function() {
        var $el = $(this.getDOMNode());
        $el
            .stop(true)
            .animate({"opacity": "1"}, 1000);
    },
    clickHandle: function(index){
        /// The click handler will update the state with
        /// the index of the focused menu entry       
 
        //Animate selected item using jQuery
        //        var elem =  $(this.refs["menuItem_"+index].getDOMNode())
        var elem =  $(this.getDOMNode())

        elem
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
        return <span onClick={this.clickHandle}>{this.props.children}</span>;
    }
});


var Menu = React.createClass({
    componentWillEnter: function(cb) {
        console.log("TEST1");
        //var $el = $(this.getDOMNode());
        //var height = $el[0].scrollHeight;
        //$el.stop(true).height(0).animate({height:height}, 200, cb);
    },

  componentDidMount: function(){
    console.log("component did mount");
  },
  componentDidUpdate: function(){
    console.log("component did update");
  },
  getInitialState: function(){
        return {focused: 0, menuItems: ['hello', 'world', 'click', 'me']};
  },
  onChildEnter: function(index){
      var elem =  $(this.refs["menuItem_"+index].getDOMNode());
      console.log("ON enter");
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
                style = 'focused';
            }
            var refName = "menuItem_"+index;

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
