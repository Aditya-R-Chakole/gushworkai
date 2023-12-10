import './styles.css';

function Taskcard({
    item
}) {
    return (
        <div className="taskcard">
            <div className='taskTitle'>{item.task.title}</div>
            <div className='taskDiscription'>{item.task.discription}</div>

            <div className='subtaskList'>
                {(item.subtasks.length > 0)?(
                    item.subtasks.map((subitem, idx)=>{
                        return (
                            <div key={`${item.task.id} - ${idx}`}>
                                {subitem.title}
                            </div>
                        )
                    })
                ):(null)}
            </div>
        </div>
    );
}

export default Taskcard;
