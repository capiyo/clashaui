import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

export function RightSheet() {
  return (
    <Sheet>
      <SheetTrigger>Open Right Sheet</SheetTrigger>
      <SheetContent side="right"> {/* Specify 'right' for the side property */}
        <SheetHeader>
          <SheetTitle>Right-Aligned Sheet</SheetTitle>
          <SheetDescription>
            This sheet opens from the right side of the screen.
          </SheetDescription>
        </SheetHeader>
        {/* Add your content here */}
      </SheetContent>
    </Sheet>
  );
}