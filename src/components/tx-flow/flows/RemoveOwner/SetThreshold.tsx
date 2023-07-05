import { useState } from 'react'
import { Button, Box, CardActions, Divider, Grid, MenuItem, Select, Typography } from '@mui/material'
import type { ReactElement, SyntheticEvent } from 'react'
import type { SelectChangeEvent } from '@mui/material'

import EthHashInfo from '@/components/common/EthHashInfo'
import useSafeInfo from '@/hooks/useSafeInfo'
import TxCard from '../../common/TxCard'
import type { RemoveOwnerFlowProps } from '.'

import commonCss from '@/components/tx-flow/common/styles.module.css'

export const SetThreshold = ({
  params,
  onSubmit,
}: {
  params: RemoveOwnerFlowProps
  onSubmit: (data: RemoveOwnerFlowProps) => void
}): ReactElement => {
  const { safe } = useSafeInfo()
  const [selectedThreshold, setSelectedThreshold] = useState<number>(params.threshold || 1)

  const handleChange = (event: SelectChangeEvent<number>) => {
    setSelectedThreshold(parseInt(event.target.value.toString()))
  }

  const onSubmitHandler = (e: SyntheticEvent) => {
    e.preventDefault()
    onSubmit({ ...params, threshold: selectedThreshold })
  }

  const newNumberOfOwners = safe ? safe.owners.length - 1 : 1

  return (
    <TxCard>
      <form onSubmit={onSubmitHandler}>
        <Box mb={3}>
          <Typography mb={2}>Review the owner you want to remove from the active Safe Account:</Typography>
          {/* TODO: Update the EthHashInfo style from the replace owner PR */}
          <EthHashInfo address={params.removedOwner.address} shortAddress={false} showCopyButton hasExplorer />
        </Box>

        <Divider className={commonCss.nestedDivider} />

        <Box my={3}>
          <Typography variant="h4" fontWeight={700} mb="2px">
            Threshold
          </Typography>
          {/* TODO: Add info tooltip once we have the text */}
          <Typography>Any transaction requires the confirmation of:</Typography>
          <Grid container direction="row" alignItems="center" gap={1} mt={2}>
            <Grid item xs={1.5}>
              <Select value={selectedThreshold} onChange={handleChange} fullWidth>
                {safe.owners.slice(1).map((_, idx) => (
                  <MenuItem key={idx + 1} value={idx + 1}>
                    {idx + 1}
                  </MenuItem>
                ))}
              </Select>
            </Grid>
            <Grid item>
              <Typography>out of {newNumberOfOwners} owner(s)</Typography>
            </Grid>
          </Grid>
        </Box>

        <Divider className={commonCss.nestedDivider} />

        <CardActions>
          <Button variant="contained" type="submit">
            Next
          </Button>
        </CardActions>
      </form>
    </TxCard>
  )
}