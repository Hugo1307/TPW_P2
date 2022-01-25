import {Component, OnInit} from '@angular/core';
import {UsersService} from "../services/users/users.service";
import {Session} from "../utils/session";
import {FormBuilder} from "@angular/forms";
// import {InfoModalComponent} from "../info-modal/info-modal.component";
// import {NgbActiveModal, NgbModal} from "@ng-bootstrap/ng-bootstrap";
// import {CreatePostModalComponent} from "../create-post-modal/create-post-modal.component";

@Component({
    selector: 'app-edit-profile-root',
    templateUrl: './edit-profile.component.html',
    styleUrls: ['./edit-profile.component.css']
})
export class EditProfileComponent implements OnInit {

    image: any;
    image_preview: any;
    session!: Session | null;
    changesCounter: number;

    pictureForm = this.formBuilder.group({
        file: ''
    });

    constructor(private usersService: UsersService, private formBuilder: FormBuilder) {
        this.session = Session.getCurrentSession();
        this.changesCounter = 0;
    }

    /*
    handlePostCreation() {
        const modalReference = this.modalService.open(CreatePostModalComponent);
        modalReference.result.then(() => {
            this.changesCounter++;
        });
    }
     */

    updatePreview() {
        this.image_preview.src = URL.createObjectURL(this.image.files[0]);
    }

    ngOnInit(): void {
        this.image = document.getElementById("image");
        this.image_preview = document.getElementById("image-preview")
    }

    /*
    closeModal(): void {
        this.modal.close();
    }
     */

    updateProfilePic() {

        if (this.session === null || this.pictureForm.get('file') === null)
            return;

        // @ts-ignore
        if (this.pictureForm.get('file').value === null)
            return;

        // @ts-ignore
        let file = this.pictureForm.get('file').value

        this.usersService.updateProfilePic(this.session.email, file).subscribe({
            error: err => {
                console.log('Error updating profile picture: ' + err.toString())
                /*
                const infoModal = this.modalService.open(InfoModalComponent);
                infoModal.componentInstance.title = 'Profile Picture';
                infoModal.componentInstance.body = 'Error updating profile picture.';
                 */
                window.alert('Error updating profile picture.');
            },
            complete: () => {
                /*
                const infoModal = this.modalService.open(InfoModalComponent);
                infoModal.componentInstance.title = 'Profile Picture';
                infoModal.componentInstance.body = 'Successfully updated profile picture';
                 */
                window.alert('Successfully updated profile picture');
            }
        })
            // .add(() => this.closeModal())
    }
}
