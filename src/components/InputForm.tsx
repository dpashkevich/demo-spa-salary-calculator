// React import not needed with new JSX transform
import * as stylex from '@stylexjs/stylex';
import { Label } from "./ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";

const styles = stylex.create({
  container: {
    position: 'relative',
    maxWidth: '28rem',
  },
  header: {
    background: 'linear-gradient(to bottom, #6b57ff, rgba(107, 87, 255, 0))',
    borderTopLeftRadius: '1.5rem',
    borderTopRightRadius: '1.5rem',
    padding: '1.5rem',
    marginBottom: '0',
  },
  headerContent: {
    color: 'white',
  },
  stepNumber: {
    fontSize: '2.25rem',
    marginBottom: '1rem',
  },
  stepDescription: {
    fontSize: '1.25rem',
  },
  form: {
    backgroundColor: '#19191c',
    borderBottomLeftRadius: '1.5rem',
    borderBottomRightRadius: '1.5rem',
    padding: '1.5rem',
    display: 'flex',
    flexDirection: 'column',
    gap: '1.5rem',
  },
  fieldContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.5rem',
  },
  label: {
    color: 'white',
  },
  select: {
    backgroundColor: '#303033',
    borderColor: 'rgba(255, 255, 255, 0.1)',
    color: 'white',
  },
});

interface InputFormProps {
  language: string;
  country: string;
  onLanguageChange: (value: string) => void;
  onCountryChange: (value: string) => void;
}

export function InputForm({
  language,
  country,
  onLanguageChange,
  onCountryChange
}: InputFormProps) {
  const programmingLanguages = ['JavaScript', 'Python', 'Java', 'TypeScript', 'React', 'Kotlin', 'C++', 'C#', 'Go', 'Ruby'];
  const countries = ['United States', 'Canada', 'United Kingdom', 'Germany', 'Australia', 'Netherlands', 'Sweden', 'France'];

  return (
    <div {...stylex.props(styles.container)}>
      {/* Step 1 Header */}
      <div {...stylex.props(styles.header)}>
        <div {...stylex.props(styles.headerContent)}>
          <h3 {...stylex.props(styles.stepNumber)}>1</h3>
          <p {...stylex.props(styles.stepDescription)}>Enter your programming language and country.</p>
        </div>
      </div>
      
      {/* Input Form */}
      <div {...stylex.props(styles.form)}>
        <div {...stylex.props(styles.fieldContainer)}>
          <Label htmlFor="language" {...stylex.props(styles.label)}>Programming language</Label>
          <Select value={language} onValueChange={onLanguageChange}>
            <SelectTrigger {...stylex.props(styles.select)}>
              <SelectValue placeholder="Select language" />
            </SelectTrigger>
            <SelectContent>
              {programmingLanguages.map((lang) => (
                <SelectItem key={lang} value={lang}>{lang}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        
        <div {...stylex.props(styles.fieldContainer)}>
          <Label htmlFor="country" {...stylex.props(styles.label)}>Country</Label>
          <Select value={country} onValueChange={onCountryChange}>
            <SelectTrigger {...stylex.props(styles.select)}>
              <SelectValue placeholder="Select country" />
            </SelectTrigger>
            <SelectContent>
              {countries.map((ctry) => (
                <SelectItem key={ctry} value={ctry}>{ctry}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
}