interface SlpSelectorProps {
  setSlpFiles: React.Dispatch<React.SetStateAction<Array<File>>>;
}

const SlpSelector: React.FC<SlpSelectorProps> = ({
  setSlpFiles,
}) => {

  return (<label htmlFor="dropzone-file" className={`
    flex justify-center w-full cursor-pointer
  `}>
    <div className="flex flex-col flex-grow justify-center items-center">
      <div className="flex flex-col flex-grow justify-center items-center pt-3">
        <svg className="w-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path>
        </svg>
        <p className="font-semibold mt-2">
          Upload your <span style={{color: 'var(--accent-yellow)'}}>whole</span> Slippi replays folder
        </p>
      </div>
      <div style={{
        position: 'relative',
        bottom: '0.2em',
        fontSize: '90%',
        textAlign: 'left',
        marginTop: '2em',
        width: '90%',
        paddingBottom: '0.8em',
      }}>
        <p style={{marginBottom: '-0.3em'}}>You can usually find it in:</p>
        <p>{'"C:/Users/<username>/Documents/Slippi"'}</p>
      </div>
    </div>
    <input
      id="dropzone-file"
      type="file"
      webkitdirectory=""
      directory=""
      className="hidden"
      onChange={event => {
        const files = Array.from(event.target.files || [])
          .filter(file => file.name.endsWith('.slp'))
        setSlpFiles(files);
      }}
      />
  </label>);
};
export default SlpSelector;
