import { Grid, Divider } from '@mui/material';
import Sort from './Sort'
import FilterCrop from './FilterCrop'
import MoreFilters from './MoreFilters'

const SortPanel = () => {
  const cardText = {
    display: 'flex',
    justifyContent: 'flex-end',
    fontFamily: '"Roboto","Helvetica","Arial",sans-serif'
  };

  const imageStyle = {
    display: 'flex'
  };
  
  return (
    <>        
      <Grid container direction="row" justifyContent="flex-end" alignItems="flex-start" spacing={-12.5} columnGap={6} marginTop="3%">
          <MoreFilters cardText={cardText} imageStyle={imageStyle} />
          <FilterCrop cardText={cardText} imageStyle={imageStyle} />
          <Divider orientation='vertical' flexItem />
          <Sort cardText={cardText} />
      </Grid>
    </>
  )
}

export default SortPanel;
