import * as React from "react";
import {
    TextField,
    DatePicker,
} from "office-ui-fabric-react";
import "./analytics.css";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { Button } from "azure-devops-ui/Button";
import { WorkItemBody } from "../../models/workItemBody";

class AnalyticsForm extends React.Component {
    constructor(props) {
        super(props);

        this.state = { 
            text: '',
            date: '',
            fields: {},
            errors: {}
        }
        this.handleObjectiveChange = this.handleObjectiveChange.bind(this)
    }

    handleObjectiveChange(value) {
        this.setState({ text: value });
        let fields = this.state.fields;
        fields['objective'] = value;
        this.setState({fields});
        //this.handleValidation()
      }

    handleSponsorInputChange = (_, value) => {
        let fields = this.state.fields;
        fields["sponsor"] = value;
        this.setState({fields});
       // this.handleValidation();

    }

    handleTitleChange = (_, value) => {
        let fields = this.state.fields;
        fields["title"] = value;
        this.setState({fields});
        //this.handleValidation()
  
    }

    handleDateChange = (value) => {
        this.setState({date: value});
        let fields = this.state.fields;
        fields["date"] = value;
        this.setState({fields});
        //this.handleValidation();
    }

    handleValidation = () =>{
        let fields = this.state.fields;
        let errors = {};
        let formIsValid = true;
    
        if(!fields["title"]){
          formIsValid = false;
          errors["title"] = "Title is required";
        }

        if(!fields["sponsor"]){
            formIsValid = false;
            errors["sponsor"] = "Business sponsor is required";
          }

          if(!fields["date"]){
            formIsValid = false;
            errors["date"] = "Date is required";
          }

          if(!fields["objective"]){
            formIsValid = false;
            errors["objective"] = "Objective is required";
          }

          //console.log(fields);

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
                <div className = "mb-4 row">
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
                            Business Sponsor
                            <span className="text-danger"> *</span>
                        </label>
                        <TextField
                            onChange = {this.handleSponsorInputChange}
                        />
                        <span className="error">{this.state.errors["sponsor"]}</span>
                    </div>
                </div>
                <div className = "mb-4 col-12">
                    <label className = "mb-1">
                        Objective
                        <span className="text-danger"> *</span>
                    </label>
                    <ReactQuill value={this.state.text}
                        onChange={this.handleObjectiveChange}/>
                    <span className="error">{this.state.errors["objective"]}</span>
                </div>
                <div className = "col-6">
                    <label className = "mb-1">
                        Need By Date
                        <span className="text-danger"> *</span>
                    </label>
                    <DatePicker 
                        value = {this.state.date}
                        placeholder = "Select a date..."
                        onSelectDate = {this.handleDateChange}
                    />
                    <span className="error">{this.state.errors["date"]}</span>
                </div>
            </div>
        )
    }
}

export default AnalyticsForm;