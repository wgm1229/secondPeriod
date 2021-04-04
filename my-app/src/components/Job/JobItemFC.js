export default function JobItemFC(props){
  return (
    <div>
      <h3>岗位名称：{props.jobname}</h3>
      <p>薪资待遇:{props.salary}k</p>
    </div>
  )
}