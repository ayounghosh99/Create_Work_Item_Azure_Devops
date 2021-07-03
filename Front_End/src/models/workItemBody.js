export class WorkItemBody {
    operation = "Add";
    path = "/fields/System.Title";
    from = null;
    value = "";
    setValue(val) {
        value = val;
    }
}