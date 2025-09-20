import { FilterStatus } from '@/types/FilterStatus'
import { StampIcon, Trash2 } from 'lucide-react-native'
import { Text, TouchableOpacity, View } from 'react-native'
import { StatusIcon } from '../StatusIcon'
import { s } from './styles'

type ItemData = {
  status: FilterStatus
  description: string
}

type Props = {
  data: ItemData,
  onRemove: VoidFunction,
  onStatus: VoidFunction
}

export function Item({ data, onRemove, onStatus }: Props) {
  return (
    <View style={s.container}>
      <TouchableOpacity activeOpacity={0.8} onPress={onStatus}>
        <StatusIcon status={data.status} />
      </TouchableOpacity>
      <Text style={s.description}>{data.description}</Text>

      <TouchableOpacity onPress={onRemove}>
        <Trash2 size={18} color="#828282" />
      </TouchableOpacity>
    </View>
  )
}
