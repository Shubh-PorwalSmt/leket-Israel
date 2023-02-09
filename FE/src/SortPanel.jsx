import { Grid, Divider } from '@mui/material';
import Sort from './Sort'
import FilterCrop from './FilterCrop'
import MoreFilters from './MoreFilters'

const cardText = {
  display: 'flex',
  justifyContent: 'flex-end',
  fontFamily: '"Roboto","Helvetica","Arial",sans-serif'
};

const imageStyle = {
  display: 'flex'
};

const SortPanel = ({ sortMethod, setSortMethod, handleClearFilters, cropKind, setCropKind, moreCropKinds, setMoreCropKinds, optionArea, optionCareStatus, optionMoreFilters, setOptionArea, setOptionCareStatus, setOptionMoreFilters }) => {
  return (
    <>        
      <Grid container direction="row" justifyContent="flex-end" alignItems="flex-start" columnGap={6} marginTop="5%">
          <MoreFilters cardText={cardText} imageStyle={imageStyle} handleClearFilters={handleClearFilters}
            optionArea={optionArea} optionCareStatus={optionCareStatus} optionMoreFilters={optionMoreFilters}
            setOptionArea={setOptionArea} setOptionCareStatus={setOptionCareStatus} setOptionMoreFilters={setOptionMoreFilters} />
          <FilterCrop cardText={cardText} imageStyle={imageStyle} cropKind={cropKind} setCropKind={setCropKind}
            moreCropKinds={moreCropKinds} setMoreCropKinds={setMoreCropKinds} />
          <Divider orientation='vertical' light flexItem />
          <Sort sortMethod={sortMethod} setSortMethod={setSortMethod} cardText={cardText} />
      </Grid>
    </>
  )
}

export default SortPanel;
