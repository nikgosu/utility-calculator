import './App.css';
import {Box, TextField, Typography} from "@mui/material";
import {useEffect, useState} from "react";

function App() {

  const [total, setTotal] = useState(0)
  const [gas, setGas] = useState({price: 7.96})
  const [electricity, setElectricity] = useState({price: 2.64})
  const [water, setWater] = useState({price: 35.16})
  const [waterKitchen, setWaterKitchen] = useState({price: 35.16})
  const [OSMD, setOSMD] = useState(544.54)

  const handleInputChange = (event, utilityName) => {
    switch (utilityName) {
      case 'gas':
        setGas(prevState => ({...prevState, [event.target.name]: +event.target.value}))
        break
      case 'electricity':
        setElectricity(prevState => ({...prevState, [event.target.name]: +event.target.value}))
        break
      case 'water':
        setWater(prevState => ({...prevState, [event.target.name]: +event.target.value}))
        break
      case 'waterKitchen':
        setWaterKitchen(prevState => ({...prevState, [event.target.name]: +event.target.value}))
        break
      default:
        return
    }
  }

  const calculateSum = (obj, utilityName) => {
    if (obj.old && obj.new && obj.price) {
      obj.sum = (obj.new - obj.old) * obj.price
      switch (utilityName) {
        case 'gas':
          setGas({...obj})
          break
        case 'electricity':
          setElectricity({...obj})
          break
        case 'water':
          setWater({...obj})
          break
        case 'waterKitchen':
          setWaterKitchen({...obj})
          break
        default:
          return
      }
    }
  }

  useEffect(() => {
    calculateSum(gas, 'gas')
  }, [gas]);

  useEffect(() => {
    calculateSum(electricity, 'electricity')
  }, [electricity]);

  useEffect(() => {
    calculateSum(water, 'water')
  }, [water]);

  useEffect(() => {
    calculateSum(waterKitchen, 'waterKitchen')
  }, [waterKitchen]);

  useEffect(() => {
    setTotal((gas.sum ?? 0) + (electricity.sum ?? 0) + (water.sum ?? 0) + (waterKitchen.sum ?? 0) + (OSMD ?? 0))
  }, [gas.sum, electricity.sum, water.sum, waterKitchen.sum]);

  useEffect(() => {
    gas.sum && localStorage.setItem('gas', JSON.stringify(gas))
    electricity.sum && localStorage.setItem('electricity', JSON.stringify(electricity))
    water.sum && localStorage.setItem('water', JSON.stringify(water))
    waterKitchen.sum && localStorage.setItem('waterKitchen', JSON.stringify(waterKitchen))
    OSMD && localStorage.setItem('OSMD', JSON.stringify(OSMD))
  }, [total]);

  useEffect(() => {
    const gas = JSON.parse(localStorage.getItem('gas'))
    const electricity = JSON.parse(localStorage.getItem('electricity'))
    const water = JSON.parse(localStorage.getItem('water'))
    const waterKitchen = JSON.parse(localStorage.getItem('waterKitchen'))
    const OSMD = JSON.parse(localStorage.getItem('OSMD'))

    if (gas) {
      gas.old = gas.new
      gas.new = undefined
      gas.sum = undefined
      setGas(gas)
    }
    if (electricity) {
      electricity.old = electricity.new
      electricity.new = undefined
      electricity.sum = undefined
      setElectricity(electricity)
    }
    if (water) {
      water.old = water.new
      water.new = undefined
      water.sum = undefined
      setWater(water)
    }
    if (waterKitchen) {
      waterKitchen.old = waterKitchen.new
      waterKitchen.new = undefined
      waterKitchen.sum = undefined
      setWaterKitchen(waterKitchen)
    }
    if (OSMD) {
      setOSMD(OSMD)
    }
  }, []);

  return (
    <div className="App">
      <Box sx={{margin: 'auto auto'}}>
        <Typography sx={{mb: 2}}>Gas</Typography>
        <TextField
          type={'number'}
          name={'old'}
          value={gas.old}
          id="outlined-basic"
          label="Old"
          variant="outlined"
          onChange={(e) => handleInputChange(e, 'gas')}
        />
        <TextField
          type={'number'}
          name={'new'}
          value={gas.new}
          id="outlined-basic"
          label="New"
          variant="outlined"
          onChange={(e) => handleInputChange(e, 'gas')}
        />
        <TextField
          type={'number'}
          name={'price'}
          value={gas.price}
          id="outlined-basic"
          label="Price"
          variant="outlined"
          onChange={(e) => handleInputChange(e, 'gas')}
        />
        <TextField
          type={'number'}
          name={'sum'}
          value={gas.sum}
          id="outlined-basic"
          variant="outlined"
          disabled={true}
        />
      </Box>
      <Box>
        <Typography sx={{mb: 2, mt: 2}}>Electricity</Typography>
        <TextField
          type={'number'}
          name={'old'}
          value={electricity.old}
          id="outlined-basic"
          label="Old"
          variant="outlined"
          onChange={(e) => handleInputChange(e, 'electricity')}
        />
        <TextField
          type={'number'}
          name={'new'}
          value={electricity.new}
          id="outlined-basic"
          label="New"
          variant="outlined"
          onChange={(e) => handleInputChange(e, 'electricity')}
        />
        <TextField
          type={'number'}
          name={'price'}
          value={electricity.price}
          id="outlined-basic"
          label="Price"
          variant="outlined"
          onChange={(e) => handleInputChange(e, 'electricity')}
        />
        <TextField
          type={'number'}
          name={'sum'}
          value={electricity.sum}
          id="outlined-basic"
          
          variant="outlined"
          disabled={true}
          onChange={(e) => handleInputChange(e, 'electricity')}
        />
      </Box>
      <Box>
        <Typography sx={{mb: 2, mt: 2}}>Water</Typography>
        <TextField
          type={'number'}
          name={'old'}
          value={water.old}
          id="outlined-basic"
          label="Old"
          variant="outlined"
          onChange={(e) => handleInputChange(e, 'water')}
        />
        <TextField
          type={'number'}
          name={'new'}
          value={water.new}
          id="outlined-basic"
          label="New"
          variant="outlined"
          onChange={(e) => handleInputChange(e, 'water')}
        />
        <TextField
          type={'number'}
          name={'price'}
          value={water.price}
          id="outlined-basic"
          label="Price"
          variant="outlined"
          onChange={(e) => handleInputChange(e, 'water')}
        />
        <TextField
          type={'number'}
          name={'sum'}
          value={water.sum}
          id="outlined-basic"
          
          variant="outlined"
          disabled={true}
          onChange={(e) => handleInputChange(e, 'water')}
        />
      </Box>
      <Box>
        <Typography sx={{mb: 2, mt: 2}}>Water (kitchen)</Typography>
        <TextField
          type={'number'}
          name={'old'}
          value={waterKitchen.old}
          id="outlined-basic"
          label="Old"
          variant="outlined"
          onChange={(e) => handleInputChange(e, 'waterKitchen')}
        />
        <TextField
          type={'number'}
          name={'new'}
          value={waterKitchen.new}
          id="outlined-basic"
          label="New"
          variant="outlined"
          onChange={(e) => handleInputChange(e, 'waterKitchen')}
        />
        <TextField
          type={'number'}
          name={'price'}
          value={waterKitchen.price}
          id="outlined-basic"
          label="Price"
          variant="outlined"
          onChange={(e) => handleInputChange(e, 'waterKitchen')}
        />
        <TextField
          type={'number'}
          name={'sum'}
          value={waterKitchen.sum}
          id="outlined-basic"
          
          variant="outlined"
          disabled={true}
          onChange={(e) => handleInputChange(e, 'waterKitchen')}
        />
      </Box>
      <Box>
        <TextField
          type={'number'}
          name={'OSMD'}
          value={OSMD}
          id="outlined-basic"
          label="OSMD"
          variant="outlined"
          sx={{mt: 2}}
          onChange={(e) => setOSMD(+e.target.value)}
        />
      </Box>
      <Box>
        <TextField
          type={'number'}
          name={'TOTAL'}
          value={total}
          id="outlined-basic"
          label="TOTAL"
          variant="outlined"
          disabled={true}
          sx={{mt: 2}}
        />
      </Box>
    </div>
  );
}

export default App;
