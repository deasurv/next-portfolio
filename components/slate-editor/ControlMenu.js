import { Button } from 'reactstrap';

const ControlMenu = (props) => {
    return(
        <div className="control-menu">
            <span className="status-box">{ props.isSaving ? 'Saving...' : 'Saved'}</span>
            <Button color="success" onClick={props.save} disabled={props.isSaving}>Save</Button>
        </div>
    );
};

export default ControlMenu;