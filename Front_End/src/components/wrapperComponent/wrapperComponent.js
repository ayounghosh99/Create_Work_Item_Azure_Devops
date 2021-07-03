import * as React from "react";
import {
    Dropdown,
    IDropdownOption,
} from "office-ui-fabric-react";
import * as bs from 'react-bootstrap';
import AnalyticsForm from "../analyticsForm/analyticsForm";
import DataServiceForm from '../dataServiceForm/dataServiceForm';
import BusinessIntelligenceForm from "../businessIntelligenceForm/BusinessIntelligenceForm"
import './wrapper.css';

class WrapperComponent extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            option: -1
        }
    }

    render() {
        return (
            <div className = "container">
                <div className = "title pt-24 pb-12">
                    GDC Centralized Intake Form
                </div>
                <div className="form">
                    <div className = "header form-group mb-3">
                        <div>
                            <label className="mb-1">
                                GDC Data & Analytics Area
                            </label>
                            <Dropdown
                                className = "dropdown"
                                onChange={this.onSetFormType}
                                placeHolder="Select an Option"
                                options={[{ key: '0', text: "GEP Analytics" }, { key: '1', text: "GDC Business Intelligence" }, { key: '2', text: "Data Services" }]}
                            />
                        </div>
                    </div>
                    {this.state.option === 0 ? (
                        <AnalyticsForm />
                    ): ""}
                    {this.state.option === 1 ? (
                        <BusinessIntelligenceForm />
                    ): ""}
                    {this.state.option === 2 ? (
                        <DataServiceForm />
                    ): ""}

                    
                </div>
                    
            </div>
        )
    }

    onSetFormType = (_, option) => {
        const opt = parseInt(option.key.toString());
        this.setState({option: opt});
    }
}

export default WrapperComponent;