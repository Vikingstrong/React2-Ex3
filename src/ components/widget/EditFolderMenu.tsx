import { useForm } from 'react-hook-form';
import { Dialog, TextField, Button } from '@mui/material';
import { X } from 'lucide-react';
import { useAtom } from 'jotai';
import { editFolderAtom } from '../../store/foldersAtom';
import { useEffect } from 'react';
import type { Ifolder } from '../../pages/Folders';

interface IFolderForm {
  name: string;
  color: string;
}

interface Props {
  open: boolean;
  onClose: () => void;
  folder: Ifolder | null;
}

export default function EditFolderMenu({ open, onClose, folder }: Props) {

  const [, editFolder] = useAtom(editFolderAtom);

  const { register, handleSubmit, setValue, watch, reset } = useForm<IFolderForm>({
    defaultValues: {
      name: '',
      color: '#2F44FF',
    },
  });

  const currentColor = watch('color');

  const colorPreset = ['#ff8800', '#10b981', '#3b82f6', '#8b5cf6', '#ec4899', '#f43f5e'];

  useEffect(() => {
    if (folder && open) {
      reset({
        name: folder.name,
        color: folder.color,
      });
    }
  }, [folder, open, reset]);

  const handleFormSubmit = async (data: IFolderForm) => {
    if (folder) {
      await editFolder(data, folder.id);
      reset();
      onClose();
    }
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <form className='flex w-full lg:w-100 flex-col' onSubmit={handleSubmit(handleFormSubmit)}>
        <div className='flex p-5 items-center justify-between w-full px-3 border-b border-gray-500'>
          <p className='text-lg font-semibold'>Изменить папку</p>
          <X onClick={() => onClose()} className='hover:bg-gray-200 rounded-2xl p-1 w-8 h-8 transition-all cursor-pointer' />
        </div>
        <div className='flex flex-col gap-5 p-5'>
          <TextField {...register("name")} label="Name" required />
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
          <Button type='submit' variant='contained' color='success'>Save</Button>
        </div>
      </form>
    </Dialog>
  );
}
