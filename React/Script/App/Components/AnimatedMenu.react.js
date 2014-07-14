/** @jsx React.DOM */ 
var React = require('react/addons');

var ReactCSSTransitionGroup = React.addons.CSSTransitionGroup;


var $ = require('jquery-browserify');

var Menu = React.createClass({
  componentDidMount: function(){
    console.log("component did mount");
  },
  componentDidUpdate: function(){
    console.log("component did update");
  },
  getInitialState: function(){
        return {focused: 0, menuItems: ['hello', 'world', 'click', 'me']};
  },
  clicked: function(index){

        // The click handler will update the state with
        // the index of the focused menu entry       
 
        //Animate using jQuery
        $(this.refs["menuItem_"+index].getDOMNode()).stop().animate({"marginLeft": "500px"}, 1000, function(){  
          $(this).animate({"marginLeft":"0px"}, 1000);
        });
       
        //Animate using React
        this.state.menuItems[index] = "clicked";
        var newMenuItems = this.state.menuItems.concat(["added"]);
        this.setState({focused: index,  menuItems: newMenuItems });
    },
  /**
   * @return {object}
   */
  render: function() {
    var self = this;
    return (
      <div id="menu">
        <ReactCSSTransitionGroup transitionName="example">
          
        { this.state.menuItems.map(function(m, index){
            var style = '';

            if(self.state.focused == index){
                style = 'focused';
            }
            var refName = "menuItem_"+index;
            return <span ref={refName} className={style} onClick={self.clicked.bind(this, index)}>{m}</span>;
        }) }
        
        </ReactCSSTransitionGroup>
      </div>
      
    );  

  }

});

module.exports = Menu;
