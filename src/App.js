import React, { Component } from 'react';
import Header from './Header/header'
import Action from './Action/action'
import Options from './Options/options'
import AddOption from './AddOption/add'
import OptionModal from './OptionModal/OptionModal'
import './App.css';

class App extends Component {
 
  
    state = {
      options:[],
      selectedOption: undefined
    }
  

  handleDeleteOptions = () => {
    this.setState(() => {
      return {options:[] }
    })
  }

  handleDeleteOption = (optionToRemove) => {
    this.setState({
      options:this.state.options.filter((option) => {
        return optionToRemove !== option
      })
    })
  
  }

  componentDidMount() {

    try {
      const json = localStorage.getItem('options')
      const options = JSON.parse(json)
      
      if(options) {
        this.setState({
          options:options
        })
      }
    } catch (e) {
      
    }
    
    
  }

  componentDidUpdate(prevProps, prevState) {
    if(prevState.options.length !== this.state.options.length) {
      const json = JSON.stringify(this.state.options)
      localStorage.setItem('options',json)
    }
  }

  handlePick = () => {
    console.log('let')
    let random = Math.floor(Math.random()*this.state.options.length)
    let randomAnswer = this.state.options[random]
    console.log(randomAnswer)
    
    this.setState({
      selectedOption:randomAnswer
    })
  }

  handleAddOption = (option) => {
    if(!option) {
      return 'Enter valid value to add item.'
    } else if(this.state.options.indexOf(option) >-1) {
      return 'This option already exists.'
    }
   this.setState({
     options:this.state.options.concat([option])
   })
  }

  handleClearOption = () => {
    this.setState({
      selectedOption:undefined
    })
  }
  
  render() {

    
    return (
      <div>
        <Header/>
        <div className="container">
        <Action handlePick={this.handlePick} hasOptions={this.state.options.length > 0}/>
        <div className="widget">
        <Options
        handleDeleteOptions={this.handleDeleteOptions}
         options={this.state.options}
         handleDeleteOption={this.handleDeleteOption}/>
        
        <AddOption handleAddOption={this.handleAddOption}/>
        </div>
       
        </div>
        
        <OptionModal handleClearOption={this.handleClearOption} selectedOption={this.state.selectedOption}/>
      </div>
     
    );
  }

  
}



export default App;
