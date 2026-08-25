import { useForm } from 'react-hook-form';
import { Dialog, TextField, Button, IconButton } from '@mui/material';
import { X } from 'lucide-react';
import { useAtom } from 'jotai';
import { addFolderAtom } from '../../store/foldersAtom';

interface IFolderForm {
  name: string;
  color: string;
}

interface Props {
  open: boolean
  onClose: () => void
}


export default function CreateFolderMenu({ open, onClose }: Props) {

  const [,createFolder] = useAtom(addFolderAtom)

  const { register, handleSubmit, setValue, watch, reset, formState: { errors } } = useForm<IFolderForm>({
    defaultValues: {
      name: '',
      color: '#2F44FF',
    },
  });

  const currentColor = watch('color');

  const colorPreset = ['#ff8800', '#10b981', '#3b82f6', '#8b5cf6', '#ec4899', '#f43f5e']

  const handleFormSubmit = (data: IFolderForm) => {
    createFolder(data)
    reset();
    onClose();
  };

  return (
    <Dialog open={open}>
        <form className='flex w-full lg:w-100  flex-col' onSubmit={handleSubmit(handleFormSubmit)}>
            <div className='flex p-5 items-center justify-between w-full px-3 border-b border-gray-500'>
                <p className='text-lg font-semibold'>Создать новую папку</p>
                <X onClick={() => onClose()} className='hover:bg-gray-200 rounded-2xl p-1 w-8 h-8 transition-all cursor-pointer' />
            </div>
            <div className='flex flex-col gap-5 p-5'>
                <TextField {...register("name")} label="Name"/>
                <div className='flex flex-col gap-5'>
                    <p className='text-sm text-gray-500'>Цвет папки</p>
                    <div className='flex justify-between'>
                        <div className='flex gap-5'>
                            {
                                colorPreset.map((color, i) => (
                                    <div onClick={() => setValue('color', color)} 
                                        style={{backgroundColor:color}} 
                                        key={i} 
                                        className={`rounded-4xl w-7 h-7 transition-all duration-300 ${currentColor == color ? 'scale-125' : ''}`}>    
                                    </div>
                                ))
                            }
                        </div>
                        <input {...register('color')} className='rounded-4xl w-7 h-7' type="color" />
                    </div>
                </div>
            </div>
            <div className='p-5 flex justify-center'>
                <Button type='submit' variant='contained' color='success'>Create</Button>
            </div>
        </form>
    </Dialog>
  );
}