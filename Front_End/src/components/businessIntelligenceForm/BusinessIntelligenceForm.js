import * as React from "react";
import {
    TextField,
    DatePicker
} from "office-ui-fabric-react";
import "./BusinessIntelligenceForm.css";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { Button } from "azure-devops-ui/Button";

class BusinessIntelligenceForm extends React.Component {
    constructor(props){
        super(props);

        this.state = { 
            objectiveText: '',
            impactText: '',
            date: '',
            fields: {},
            errors: {}
        }
        this.handleObjectiveChange = this.handleObjectiveChange.bind(this)
        this.handleImpactChange = this.handleImpactChange.bind(this)
    }

    handleImpactChange(value) {
        this.setState({ impactText: value });
        let fields = this.state.fields;
        fields['impact'] = value;
        this.setState({fields});
      }

    handleObjectiveChange(value) {
        this.setState({ objectiveText: value });
        let fields = this.state.fields;
        fields['objective'] = value;
        this.setState({fields});
      }

    handleTitleChange = (_, value) => {
        let fields = this.state.fields;
        fields["title"] = value;
        this.setState({fields});
        this.handleValidation();
    }

    handleDateChange = (value) => {
        this.setState({date: value});
        let fields = this.state.fields;
        fields["date"] = value;
        this.setState({fields});
    }

    handleValidation(){
        let fields = this.state.fields;
        let errors = {};
        let formIsValid = true;
    
        //Title
        if(!fields["title"]){
          formIsValid = false;
          errors["title"] = "Title is required";
        }

        this.setState({errors: errors});
        return formIsValid;
    }

    handleSubmit = () => {
        const isValid = this.handleValidation();
        if (isValid) {
            console.log("submitted");
            console.log(this.state.fields.title)
            fetch('http://localhost:5000/api/workitem',{
            method:'POST',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                Title:this.state.fields.title
            })
        })
        .then(response=>{
            console.log(response)
            if(response.ok) {
                return response.json();
            } else {
                throw new Error('Something went wrong...');
            }
        })      
        }
        else {
            console.log("not submitted");
        }
    }

    // createWorkItem = (formData) => {
    //     var httpOptions = {
    //       headers: new HttpHeaders({
    //         'Content-Type': 'application/json'
    //       })
    //     };
    //     return this.http.post<WorkItemBody>(url, formData, httpOptions);
    //   }

    render() {
        return (
            <div className = "wrapper">
                <Button className = "add-button" onClick = {this.handleSubmit}>
                    Add
                </Button>
                <div className = "mb-4 row">
                    <div className = "col-6">
                        <label className = "mb-1">
                            Request Title
                            <span className="text-danger"> *</span>
                        </label>
                        <TextField onChange = {this.handleTitleChange}/>
                        <span className="error">{this.state.errors["title"]}</span>
                    </div>
                </div>

                <div className = "mb-4 col-12">
                    <label className = "mb-1">
                        Objective
                    </label>
                    <ReactQuill value={this.state.objectiveText}
                        onChange={this.handleObjectiveChange} />
                </div>

                <div className = "col-6 mb-4">
                    <label className = "mb-1">
                        Need By Date
                    </label>
                    <DatePicker 
                    value={this.state.date}
                    placeholder = "Select a date..."
                    onSelectDate = {this.handleDateChange}
                    />
                </div>

                <div className = "mb-4 col-12">
                    <label className = "mb-1">
                        Please add Impact
                    </label>
                    <ReactQuill value={this.state.impactText}
                    onChange={this.handleImpactChange}/>
                </div>

                {/* <div className = "col-6">
                        <label className = "mb-1">
                            Please add demo field
                        </label>
                        <TextField/>
                </div> */}
            </div>
        )
    }
}

export default BusinessIntelligenceForm;