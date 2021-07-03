import * as React from "react";
import {
    TextField,
    DatePicker,
    Dropdown
} from "office-ui-fabric-react";
import "./dataService.css";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { Button } from "azure-devops-ui/Button";
class DataServiceForm extends React.Component {
    constructor(props) {
        super(props);

        this.state = { 
            objectiveText: '',
            problemStatementText: '',
            fields: {},
            errors: {}
        }
        this.handleObjectiveChange = this.handleObjectiveChange.bind(this)
    }

    handleObjectiveChange(value) {
        this.setState({ objectiveText: value });
        let fields = this.state.fields;
        fields['objective'] = value;
        this.setState({fields});
      }

    handleProblemStatementChange = (value) => {
        this.setState({ problemStatementText: value });
    }  

    handleSponsorInputChange = (_, value) => {
        let fields = this.state.fields;
        fields["sponsor"] = value;
        this.setState({fields});

    }

    handleTitleChange = (_, value) => {
        let fields = this.state.fields;
        fields["title"] = value;
        this.setState({fields});
        this.handleValidation();
    }
    
    handleValidation = () =>{
        let fields = this.state.fields;
        let errors = {};
        let formIsValid = true;
    
        if(!fields["title"]){
          formIsValid = false;
          errors["title"] = "Title is required";
        }

        // if(!fields["requestType"]){
        //     formIsValid = false;
        //     errors["requestType"] = "Business sponsor is required";
        //   }

        //   if(!fields["date"]){
        //     formIsValid = false;
        //     errors["date"] = "Date is required";
        //   }

        //   if(!fields["objective"]){
        //     formIsValid = false;
        //     errors["objective"] = "Objective is required";
        //   }

        this.setState({errors: errors});
        return formIsValid;
    }

    handleSubmit = () => {
        const isValid = this.handleValidation();
        if (isValid) {
            console.log("submitted");
            let wib = new WorkItemBody();
            wib.setValue(this.state.fields["title"]);
            this.createWorkItem(wib);            
        }
        else {
            console.log("not submitted");
        }
    }

    createWorkItem = (formData) => {
        var httpOptions = {
          headers: new HttpHeaders({
            'Content-Type': 'application/json'
          })
        };
        return this.http.post<WorkItemBody>(url, formData, httpOptions);
      }

    render() {
        return (
            <div className = "wrapper">
                <Button className = "add-button" onClick = {this.handleSubmit}>
                    Add
                </Button>
                <div className = "d-flex mb-4 row">
                    <div className = "col-6">
                        <label className = "mb-1">
                            Request Title
                            <span className="text-danger"> *</span>
                        </label>
                        <TextField onChange = {this.handleTitleChange}/>
                        <span className="error">{this.state.errors["title"]}</span>
                    </div>
                    <div className = "col-6">
                        <label className = "mb-1">
                            Data Services Request Type
                        </label>
                        <Dropdown
                                placeHolder="Select an Option"
                                options={[{ key: '0', text: "Data Platform Development Request" }, { key: '1', text: "Report a Bug/Issue" }]}
                            />
                    </div>
                </div>
                <div className = "mb-4 col-12">
                    <label className = "mb-1">
                        Objective
                    </label>
                    <ReactQuill value={this.state.objectiveText}
                        onChange={this.handleObjectiveChange} />
                    
                </div>
                <div className = "mb-4 col-12">
                    <label className = "mb-1">
                        Problem Statement
                    </label>
                    <ReactQuill value={this.state.problemStatementText}
                        onChange={this.handleProblemStatementChange} />
                    
                </div>
            </div>
        )
    }
}

export default DataServiceForm;