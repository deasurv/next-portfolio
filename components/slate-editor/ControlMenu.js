import { Button } from 'reactstrap';

const ControlMenu = (props) => {
    return(
        <div className="control-menu">
            <span className="status-box">{ props.isSaving ? 'Saving...' : 'Saved'}</span>
            <Button color="success" onClick={props.save}>Save</Button>
        </div>
    );
};

export default ControlMenu;