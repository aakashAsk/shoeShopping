export default function Table({heading, data, columns}) {
  console.log(data[0])
  return (
    <table>
      <tr>
        {
          columns.map((x, y) => {
            return <td>{Object.keys(x).map((a, b) => {
              return x[a];
            })}</td>;
          })
        }
        
      </tr>
      {data.map((i, j) => {
        return (
          <tr>
            {Object.keys(i).map((x, y) => {
              
              // return <td>{i[x]}</td>;
              return <td>{}</td>;
            })}
            
          </tr>
        );
      })}
    </table>
  );
}