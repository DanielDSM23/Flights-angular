import { Component, computed, input, output, signal } from '@angular/core';

@Component({
  selector: 'app-button',
  imports: [],
  templateUrl: './comboBox.component.html',
  styleUrl: './comboBox.component.css'
})
export class ComboBoxComponent {
  variant = input<string>("default");
  size = input<string>("default");
  buttonType = input<string>("");
  tripType = signal("");
  buttonSize = "sm";
  
  buttonStyle = computed(()=>{
    const baseStyle = "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive";
    const variantValue = this.variant();
    const sizeValue = this.size();
    const variantStyle = this.getVariantStyle(variantValue);
    const sizeStyle = this.getSizeStyle(sizeValue);
    console.log(baseStyle+variantStyle+sizeStyle)
    return baseStyle+variantStyle+sizeStyle
  });
  
  getSizeStyle(size : string) :string{
    switch (size) {
      case "sm":
        return "h-8 rounded-md gap-1.5 px-3 has-[>svg]:px-2.5";
      case "lg":
        return "h-10 rounded-md px-6 has-[>svg]:px-4";
      case "icon":
        return "size-9 rounded-md";
      default:
        return "h-9 px-4 py-2 has-[>svg]:px-3"
    }
  }

  variantValue = computed(()=>{
    const tripType = this.tripType()
    switch (tripType) {
      case "roundtrip":
        return tripType === 'roundtrip' ? 'default' : 'outline';
      case "oneway":
        return tripType === 'oneway' ? 'default' : 'outline';
      case "multicity":
        return tripType === 'multicity' ? 'default' : 'outline';
      default:
        return "default"
    }
  })

  getVariantStyle(variant : string) :string{
    switch (variant) {
      case "destructive":
        return "bg-destructive text-white hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60";
      case "outline":
        return "border bg-background text-foreground hover:bg-accent hover:text-accent-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50";
      case "secondary":
        return "bg-secondary text-secondary-foreground hover:bg-secondary/80";
      case "ghost":
        return "hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50";
      case "link":
        return "text-primary underline-offset-4 hover:underline";
      default:
        return "bg-primary text-primary-foreground hover:bg-primary/90"
    }
  }

  setTripType(tripType :string){
    this.tripType.set(tripType);
    console.log(this.tripType())
  }
}
